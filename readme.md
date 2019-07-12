OWNER: WINIT WITCHAYANRAT
LICENSE: GPLV2

About this project

Frontend: ReactJS with Webpack in JS ES6 wiith SaSS

Backend: Django with DjangoREST framework in python 3.7 with internal SQlite DB


Prerequisite: 
	-	Python 3.7 or with pyenv or conda
	-	NodeJS 12 or above or with node version manger such as N

For non pyenv please install python 3.7
https://www.python.org/downloads/

For non node please install Node
https://nodejs.org/en/download/

1. Open CMD, powershell, or Terminal
2. CD to project directory (notice "requirement.txt" inside)
3. run "pip install -r  requirement.txt"
4. CD to "todolist/front"
5. Run "npm install"
6. Run "npm run dev" (Starting frontend react part)
7. Open other terminal
8. CD to project directory (notice "requirement.txt" inside)
9. CD to "todolist"
10. Run "python manage.py makemigrations"
11. Run "python manage.py migrate"
12. Run "python manage.py runserver" or "python3 manage.py runserver"  (starting backend server)
13. Open project on browser at 127.0.0.0:8000 or localhost:8000
