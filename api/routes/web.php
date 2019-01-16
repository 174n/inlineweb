<?php

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

Route::get('/p/{id}', 'PageController@index')->where('id', '[A-Za-z0-9-_]{7}');

Route::get('/p', function () {
    return view('inline');
});

Route::get('/{any}', 'VueController@index')->where('any', '.*');

// Route::get('/', function () {
//     return view('welcome');
// });

// Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');
