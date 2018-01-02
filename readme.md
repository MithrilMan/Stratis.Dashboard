# Stratis Dashboard

wip for a stratis dashboard feature
___


To add a feature request for the dashboard, like "please add a widget to see last 5 blocks statistics",
add an issue with a "[feature-request]" prefix tag in the title, or 
[click this link to autofill it](https://github.com/MithrilMan/Stratis.Dashboard/issues/new?title=[feature-request]), 
this will help me organize issues (i'll apply a feature-request label to them)

---

This solution has been tested on Visual Studio 2017.  
Requires [NodeJs](https://nodejs.org) and [TypeScript](https://www.npmjs.com/package/typescript) (angular/cli will be installed automatically during npm packages restore, or if the restore fails, you can manually run it using `npm install` command)

The template I'm using, allow you to use angular/cli to generate components,route,pipe, etc..., you have just to open a 
command prompt under *ClientApp* folder and use the angular/cli command to generate what you want [see angular cli *ng generate* documentation](https://github.com/angular/angular-cli/wiki/generate)


I suggest installing a visual studio extension called **Open Command Line** to speed up the process, so you can just focus the ClientApp folder on visual studio *Solution Explorer* window and ALT+Space to open a command prompt there

The first time that you build the solution, npm will restore the required node_modules so it would take a while