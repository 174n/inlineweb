git checkout master
git subtree split --prefix api -b heroku
git push -f heroku heroku:master
git branch -D heroku