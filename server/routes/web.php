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
