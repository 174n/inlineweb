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
        $this->middleware('auth:api', ['except' => ['index', 'show', 'user']]);
    }

    public function index()
    {
        return Project::with('user:id,name')
            ->select('title', 'uuid', 'user_id', 'created_at')
            ->orderBy('created_at', 'title')
            ->paginate(6);
    }

    public function show($id)
    {
        return Project::where('uuid', $id)
            ->with('user:id,name')
            ->firstOrFail();
    }

    public function user($id)
    {
        return Project::select('title', 'uuid', 'user_id', 'created_at')
            ->where('user_id', $id)
            ->with('user:id,name')
            ->paginate(6);
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
        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'code' =>
                array(
                    'string',
                    'max:4100',
                    'regex:/^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{4})$/'
                )
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
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
