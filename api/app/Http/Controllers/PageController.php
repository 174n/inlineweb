<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;

class PageController extends Controller
{
    public function index($id)
    {
        $code = Project::where('uuid', $id)
            ->select('code')
            ->firstOrFail()
            ->code;
        return redirect('/p#' . $code);
    }
}
