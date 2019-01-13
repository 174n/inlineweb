<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Crisu83\ShortId\ShortId;

class Project extends Model
{
    protected $fillable = [
        'title', 'code'
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $shortid = ShortId::create();
            $model->uuid = $shortid->generate();
        });
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
