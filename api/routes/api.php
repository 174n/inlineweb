<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

Route::group([
    'prefix' => 'projects'
], function () {
    Route::get('', 'ProjectController@index');
    Route::get('user/{id}', 'ProjectController@user');
    Route::get('{id}', 'ProjectController@show');
    Route::post('', 'ProjectController@store');
    Route::put('{id}', 'ProjectController@update');
    Route::delete('{id}', 'ProjectController@delete');
});