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
        $data = $request->json()->all();

        if (!isset($data['password']) || !isset($data['username'])) {
            throw new Exception("Password or username not sent");
        }
        
        $username = $data['username'];
        $password = $data['password'];
        
        DB::insert('INSERT INTO users (username, pass) VALUES (?, ?)', $username, $password);

        return "Created user";
    } catch (Exception $e) {
        abort(400, $e->getMessage());
    }
});

Route::post('/login', function (Request $request) {
    try {

        $data = $request->json()->all();

        if (!isset($data['username']) || !isset($data['password'])) {
            throw new Exception("Password or username not sent");
        }

        $results = DB::select('SELECT pass FROM users WHERE username=?', $data['username']);

        return var_dump($results);

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

        if (!isset($data["count"])) {
            throw new Exception("Count not sent.");
        }

        if (intval($data["count"] > 25)) {
            throw new Exception("Over top 25 is currently not supported.");
        }

        $responseObject = array();
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

