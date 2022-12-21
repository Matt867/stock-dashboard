<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

const API_KEY = "cedgceiad3i8tooa17b0cedgceiad3i8tooa17bg";

// Accepts API calls and utilizes caching with 3 minute expiration times to deliver fast responses.
function api_call($url) {

    // Assume not in cache initially, this boolean gets updated later if both of the cache checks pass (presence/timestamp)
    $current_entry_exists = false;

    $results = DB::select('SELECT id, response, expiration FROM cache WHERE request=?', array($url));

    // Look for a current entry in the cache (<5min)
    for($i=0; $i < count($results); $i++) {
        $entry = (array)$results[$i];
        if (date('Y-m-d H:i:s') < $entry["expiration"]) {

            // Up to date entry exists, return the cached response.
            return $entry["response"];

        }

        // Keep cache speedy and prevent it from getting too large by deleting rows that are expired as soon as we spot them
        else {
            DB::delete('DELETE FROM cache WHERE id=?', array($entry["id"]));
        }
    }

    // If we reach here, we don't have a current entry in the cache. Go out to the API for the response, cache it and return it.
    $api_response = Http::acceptJson()
    ->withHeaders(['X-Finnhub-Token' => API_KEY])
    ->get($url);

    // Calculate expiry time, cache the received response
    $date = date('Y-m-d H:i:s');
    $currentDate = strtotime($date);
    $futureDate = $currentDate+(180);
    $formatDate = date("Y-m-d H:i:s", $futureDate); 
    
    DB::insert('INSERT INTO cache (request, response, expiration) VALUES (?, ?, ?)', array($url, $api_response, $formatDate));

    return $api_response;
}

// Check that a token is valid, return associated user
function checkToken($token) {

    // Query userid using token
    $results = DB::select('SELECT userid FROM tokens WHERE token=?', array($token));

    // Invalid token
    if (count($results) < 1) {
        abort(403, "Invalid token");
    }

    // Tokens are unique, so there should only be one result
    $result = (array)$results[0];

    return $result["userid"];
}

// Generate an authentication token
function generateToken() {
    $token = openssl_random_pseudo_bytes(16);

    $token = bin2hex($token);

    return $token;
}

// Check if a ticker is valid
function validTicker($ticker) {
    $response = api_call('http://finnhub.io/api/v1/quote?symbol='.$ticker);

    $json = json_decode($response, true);

    if ($json['c'] == null) {
        return false;
    }
    return true;
}

// Get the price of a ticker
function getPrice($ticker) {

    if (!validTicker($ticker)) {
        return false;
    }

    $response = api_call('http://finnhub.io/api/v1/quote?symbol='.$ticker);

    $json = json_decode($response, true);

    return $json['c'];
}

Route::get('/getPrice/{ticker}', function ($ticker) {
    $response = api_call('http://finnhub.io/api/v1/quote?symbol='.$ticker);
    $json = json_decode($response, true);
    return ['price' => $json['c'], 'percentchange' => $json['dp']];
    // todo check docs, return the whole object and rename keys
});

Route::post('/signup', function (Request $request) {

    try {
        // get req body data
        $data = $request->json()->all();

        // if password or username not present throw exception
        if (!isset($data['password']) || !isset($data['username'])) {
            throw new Exception("Password or username not sent");
        }
        
        // set username and password to local vars
        $username = $data['username'];
        $password = $data['password'];
        
        // insert into db
        DB::insert('INSERT INTO users (username, password) VALUES (?, ?)', array($username, $password));

        // return success!
        return "Created user";
    } catch (Exception $e) {
        abort(400, $e->getMessage());
    }
});

Route::post('/login', function (Request $request) {
    try {
        // collect input data from request body
        $data = $request->json()->all();
        // guard clause to check if username or password exist in the request body
        if (!isset($data['username']) || !isset($data['password'])) {
            throw new Exception("Password or username not sent");
        }
        // prepared statement to query db for username password and id of username with specified username
        $results = DB::select('SELECT id, username, password FROM users WHERE username=?', array($data['username']));

        // guard clause to throw exception if user does not exist
        if (count($results) < 1) {
            abort(404, "User does not exist");
        }

        // cast the first result (as usernames are unique) to array
        $result = (array)$results[0];

        // check given password matches db password
        if ($data['password'] !== $result['password']) {
            abort(403);
        }

        // Generate new token
        $token = generateToken();

        // Store token in DB and associate it with a user
        DB::insert('INSERT INTO tokens (userid, token) VALUES (?, ?)', array($result['id'], $token));

        return array("token" => $token);

    } catch (Exception $e) {
        abort(400, $e->getMessage());
    }
});

// Get top N stocks. Note: This route is kind of slow, I think it could use some caching. Maybe create a cache, either through the DB or in an array, check if the entries are
// more than 5(?) minutes old and if they are too old, only then make external calls to the API and then update the cache with new API response and timestamp. This way, we only call the API every 5 minutes in the worst case.
// ^ Would probably fix the erratic behaviour on the homepage of the frontend.
Route::post('/gettopstocks', function (Request $request) {
    $data = $request->json()->all();

    // Currently hardcodes tickers for top 25 best performing stocks, price to be filled in by API later
    $top25 = array(
    'TSLA',
    'AAPL',
    'MSFT',
    'META',
    'GOOGL',
    'XOM',
    'VLO',
    'ENPH',
    'APA',
    'SLB',
    'COP',
    'HAL',
    'EOG',
    'CVX',
    'CAH',
    'DVN',
    'MCK',
    'CF',
    'PSX',
    'CTRA',
    'ADM',
    'VRTX',
    'MRK',
    'CI',
    'TRGP',
    );

    // Missing count in request body
    if (!isset($data["count"])) {
        throw new Exception("Count not sent.");
    }

    // Over 25 not currently supported
    if (intval($data["count"] > 25)) {
        throw new Exception("Over top 25 is currently not supported.");
    }


    $responseObject = array();

    // Get prices for top N stocks from API and append result to response array
    for ($i = 0; $i < intval($data["count"]); $i++) {
        $response = api_call('http://finnhub.io/api/v1/quote?symbol='.$top25[$i]);

        $json = json_decode($response, true);

        $responseObject[] = array('ticker' => $top25[$i], 'price' => $json['c'], 'percentchange' => $json['dp']);

        usleep(0.5);
    }

    return $responseObject;
        
});

// Given a ticker and a quantity, buy stocks and update a user's portfolio
Route::post('/buy', function (Request $request) {
    $request_data = $request->json()->all();

    // Check token, get current user ID
    $curr_user_id = checkToken($request_data["token"]);

    // Validate ticker
    if (!validTicker($request_data["ticker"])) {
        abort(404, "Invalid ticker");
    }

    // Add order to buys table
    DB::insert('INSERT INTO buyorders (ordertime, quantity, ticker, userid) VALUES (?, ?, ?, ?)', array(date('Y-m-d H:i:s'), $request_data["quantity"], $request_data["ticker"] ,$curr_user_id));

    // Add stocks and quantity to current user's portfolio. Row may already exist, in that case just update quantity
    $queryresult = DB::select('SELECT quantity FROM portfolios WHERE userid=? AND ticker=?', array($curr_user_id, $request_data["ticker"]));

    if (count($queryresult) < 1) {
        DB::insert('INSERT INTO portfolios (updated, quantity, ticker, userid) VALUES (?, ?, ?, ?)', array(date('Y-m-d H:i:s'), $request_data["quantity"], $request_data["ticker"], $curr_user_id));
    }

    else {
        $curr_quantity = (array)$queryresult[0];
        DB::update('UPDATE portfolios SET quantity=? WHERE userid=? AND ticker=?', array($curr_quantity["quantity"] + $request_data["quantity"], $curr_user_id, $request_data["ticker"]));
    }

});

// Given a ticker and a quantity, sell stocks and update a user's portfolio
Route::post('/sell', function (Request $request) {
    $request_data = $request->json()->all();

    // Check token, get current user ID
    $curr_user_id = checkToken($request_data["token"]);

    // Validate ticker
    if (!validTicker($request_data["ticker"])) {
        abort(404, "Invalid ticker");
    }

    // Check that the user has enough stocks to sell (that the sell is valid)
    $queryresult = DB::select('SELECT quantity FROM portfolios WHERE userid=? AND ticker=?', array($curr_user_id, $request_data["ticker"]));
    $owned_quantity = (array)$queryresult[0];
    if ($owned_quantity["quantity"] < $request_data["quantity"]) {
        abort(400);
    }

    // Add order to sells table
    DB::insert('INSERT INTO sellorders (ordertime, quantity, ticker, userid) VALUES (?, ?, ?, ?)', array(date('Y-m-d H:i:s'), $request_data["quantity"], $request_data["ticker"] ,$curr_user_id));

    // Update user's portfolio with new quantity. Delete the entire row if a user is selling all their shares.
    if ($owned_quantity["quantity"] == $request_data["quantity"]) {
        DB::delete('DELETE FROM portfolios WHERE userid=? AND ticker=?', array($curr_user_id, $request_data["ticker"]));
    }
    else {
        $new_quantity = $owned_quantity["quantity"] - $request_data["quantity"];
        DB::update('UPDATE portfolios SET quantity=? WHERE userid=? AND ticker=?', array($new_quantity, $curr_user_id, $request_data["ticker"]));
    }
});

// Get current username with a token todo
Route::post('/user', function (Request $request) {
    $request_data = $request->json()->all();

    // Check token, get current user ID
    $curr_user_id = checkToken($request_data["token"]);

    $queryresult = DB::select('SELECT username FROM users WHERE id=?', array($curr_user_id));

    // Get username
    $username = (array)$queryresult[0];

    // Return username (as string)
    return array("username" => $username["username"]);

});

Route::post('/portfolio', function (Request $request) {
    $request_data = $request->json()->all();
    
    // Check token, get current user ID
    $curr_user_id = checkToken($request_data["token"]);
    
    // Get and return their portfolio
    $queryresult = DB::select('SELECT ticker, quantity FROM portfolios WHERE userid=?', array($curr_user_id));
    return $queryresult;
});

Route::post('/portfolio/value', function (Request $request) {
    $request_data = $request->json()->all();

    // Check token, get current user ID
    $curr_user_id = checkToken($request_data["token"]);
    
    // Sum their portfolio, calculate and return the value
    $queryresult = DB::select('SELECT ticker, quantity FROM portfolios WHERE userid=?', array($curr_user_id));
    
    $value = 0;

    for($i=0; $i < count($queryresult); $i++) {
        $stock = (array)$queryresult[$i];
        $current_price_of_stock = getPrice($stock["ticker"]);
        $total_value_held = $current_price_of_stock * $stock["quantity"];
        $value += $total_value_held;
    }

    return $value;
});

// Get order history for current session user, most to least recent, buys and sells together
Route::post('/orders', function (Request $request) {
    $request_data = $request->json()->all();

    // Check token, get current user ID
    $curr_user_id = checkToken($request_data["token"]);

    // Query DB, get both buys and sells chronologically
    $results = array();

    $queryresult = DB::select('SELECT buyorders.ordertime, buyorders.quantity, buyorders.ticker, "BUY" AS type
          FROM buyorders
          WHERE buyorders.userid = ?
          UNION
          SELECT sellorders.ordertime, sellorders.quantity, sellorders.ticker, "SELL" AS type
          FROM sellorders
          WHERE sellorders.userid = ?
          ORDER BY ordertime DESC', array($curr_user_id, $curr_user_id));

    return $queryresult;

});

Route::get('/search/{ticker}', function ($ticker, Request $request) {

    $ticker = strtoupper($ticker);

    if (!validTicker($ticker)) {
        abort(400);
    }

    $response = api_call('http://finnhub.io/api/v1/quote?symbol='.$ticker);    
    $json = json_decode($response, true);
    
    // Add company name to response, then send response
    $response2 = api_call('http://finnhub.io/api/v1/search?q='.$ticker);    
    $json2 = json_decode($response2, true);
    $company_name = $json2["result"][0]["description"];
    
    $json["companyName"] = $company_name;
    return ['price' => $json['c'], 'change' => $json['d'], 'percentchange' => $json['dp'], 'name' => $json['companyName'], 'high' => $json['h'], 'low' => $json['l'], 'open' => $json['o'], 'previousclose' => $json['pc']];

});

Route::get('/', function (Request $request) {
    return validTicker("TSLA");
});