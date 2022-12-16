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
})

Route::get('/', function () {
    $results = DB::select('select * from users where id = ?', array(1));
    return $results;
});