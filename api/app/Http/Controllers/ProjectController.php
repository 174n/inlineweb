<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
use Validator;
use JWTAuth;

class ProjectController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show']]);
    }

    public function index()
    {
        return Project::all();
    }

    public function show($id)
    {
        return Project::where('uuid', $id)->firstOrFail();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'code' =>
                array(
                    'required',
                    'string',
                    'max:4100',
                    'regex:/^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{4})$/'
                )
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        return JWTAuth::user()->projects()->create([
            'title' => $request->get('title'),
            'code' => $request->get('code'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $project = Project::where('uuid', $id)->firstOrFail();
        if(JWTAuth::user()->is($project->user)) {
            $project->update($request->all());
            return $project;
        }
        else {
            return 404;
        }

    }

    public function delete(Request $request, $id)
    {
        $project = Project::where('uuid', $id)->firstOrFail();

        if(JWTAuth::user()->is($project->user)) {
            $project->delete();        
            return 204;
        }
        else {
            return 404;
        }
        
    }

}
