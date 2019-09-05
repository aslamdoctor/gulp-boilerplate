# Development Files Introduction

1. **dev/** : This is the folder in which all the development work will be done on CSS and JS files
1. **dev/.git** : Used for git versions controlling purpose. We don't need to do anything in this folder. It is auto generated.
1. **dev/node_modules** : Used for storing node packages. This folder will not available at first stage when downloaded Git repo. We don't need to do anything in this folder. It is auto generated.
1. **dev/src** : This is the main folder. It contains all sass and js files we will work on.
1. **dev/gulpfile.js** : This is gulp configuration file. You have to configure couple of things in it at first.
1. **dev/package.json**, dev/package-lock.json : These files keeps record of all the Node packages we will be using. Don't modify it.
1. **dev/.gitignore** : This file contains list of files that don't need to be pushed to the Repo. I have already updated this file so no need to touch it aswell.
1. **README.md** => Just a file for Github repo for instruction purpose.



---


# Steps for GULP

**STEP 1** - Create folder **"dev"** in Project's root folder. e.g. project folder is **"my_project"** then create folder at **"my_project/dev"**. Please make note that you will be doing all the development work related to CSS and JS in this folder only.

**STEP 2** - Open terminal and run below command. It will load all the development files in /dev folder
```
cd dev
git clone YOUR_REPO
```

**STEP 3** - Open **gulpfile.js** and edit line where it says **"theme_folder"** as below and update the folder name. Keep the folder path as it is.
`var theme_folder="../wp-content/themes/my_theme/"`

**STEP 4** - Open terminal and run below commands. That will generate all the necessary distribution files.
```
cd dev (if not done already)
npm install
gulp build (run this only for html version)
gulp buildwp (run only for wordpress version)
```

**STEP 5** - The files on which you will be working are under
```
/dev/src/*.scss
/dev/src/*.js
```

**STEP 6** - While editing any of development files, make sure you run below command on terminal. It will keep the compiler running. 
```
cd dev
gulp watchwp
```
It generates all the files inside **theme_folder/dest/** folder. So you don't need to touch any css and js files inside theme folder.

**STEP 7** - Once development is done, close the compiler by pressing **"ctrl + c"** key on terminal.

**STEP 8** - After all is done, don't forget to push the changes on Git repo using below command so we can stay in sync.
```
cd dev
git push
```

**STEP 9** - If you want to add any new SASS file, simply add it inside **/dev/src/css/** folder and it will compile automatically. Don't forget to stop gulp compiler and restart it using `gulp watch` command.


**STEP 10** - If you want to add any new JS file, put them inside **/dev/src/js/** folder. After that update gulpfile.js file and add path to this JS file inside Array variable that says like below. Make sure scripts.js entry stays as last element of array.
Don't forget to stop gulp compiler and restart it using `gulp watch` command.

```
// add all the js files here to compile
var js_files = [
	'./src/js/jquery-3.3.1.min.js',
	'./src/js/bootstrap/bootstrap.bundle.min.js',
	'./src/js/slick/slick.min.js',
    ... add our js files here ...
	'./src/js/scripts.js',
]
```