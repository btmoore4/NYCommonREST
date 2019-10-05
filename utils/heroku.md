# Heroku Cheatsheet

### Push to Heroku master
```
git push heroku master
```
### Ensures at least one instance is running: 
```
heroku ps:scale web=1
```
### Opens the application url
```
'heroku open
```
### Runs Heroku app locally
```
heroku local web
```
### Tails Heroku logs
```
heroku logs --tail
```
