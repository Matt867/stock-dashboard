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

Route::get('/getPrice/{ticker}', function ($ticker) {
    $response = Http::acceptJson()
        ->withHeaders(['X-Finnhub-Token' => API_KEY])
        ->get('http://finnhub.io/api/v1/quote?symbol='.$ticker);
    $json = $response->json();
    return json_encode(['price' => $json['c']]);
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
    } catch (Exception $e) {s
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

        /*
        * set some key vals in session that will allow us to
        * get user info without having to constantly ask user to login
        */
        session(['id' => $result['id'], 'username' => $result['username']]);

        return "Logged in";

    } catch (Exception $e) {
        abort(400, $e->getMessage());
    }
});

// Get top N stocks
Route::get('/gettopstocks', function (Request $request) {
    try {
        $data = $request->json()->all();

        // Currently hardcodes tickers for top 25 best performing stocks, price to be filled in by API later
        $top25 = array(
        'OXY',
        'EQT',
        'HES',
        'MPC',
        'MRO',
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
            $response = Http::acceptJson()
            ->withHeaders(['X-Finnhub-Token' => API_KEY])
            ->get('http://finnhub.io/api/v1/quote?symbol='.$top25[$i]);

            $json = $response->json();

            $responseObject[] = array($top25[$i] => $json["c"]);
        }

        return $responseObject;
        
    } catch (Exception $e) {
        abort(400, $e->getMessage());
    }
});




Route::get('/', function () {
    return csrf_token();
});

