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
    return json_encode($request->all());
});

Route::get('/', function () {
    $results = DB::select('select * from users where id = ?', array(1));
    return $results;
});