/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/


  '/': 'PageController.index',
  '/register': 'PageController.register',
  '/login': 'PageController.login',
  '/profile': 'AppController.profile',
  '/mundo': 'AppController.mundo',
  //--------------SEC-------------
  '/indexApp': 'SEC_AppController.indexApp',
  //
  '/newPermission': 'SEC_AppController.newPermission',
  '/listPermissions': 'SEC_AppController.listPermissions',
  '/editPermission/:id': 'SEC_AppController.editPermission',
  //
  '/newMenu': 'SEC_AppController.newMenu',
  '/listMenus': 'SEC_AppController.listMenus',
  '/editMenu/:id': 'SEC_AppController.editMenu',
  //
  '/newRole': 'SEC_AppController.newRole',
  '/listRoles': 'SEC_AppController.listRoles',
  '/editRole/:id': 'SEC_AppController.editRole',
  //
  '/newUser': 'SEC_AppController.newUser',
  '/listUsers': 'SEC_AppController.listUsers',
  '/editUser/:id': 'SEC_AppController.editUser',
  //-------------------------------
  //
  '/newTeacher': 'AppController.newTeacher',
  '/listTeachers': 'AppController.listTeachers',
  '/editTeacher/:id':'AppController.editTeacher',

  //-------------------------------
  //
  '/newStudent': 'AppController.newStudent',
  '/listStudents': 'AppController.listStudents',
  '/editStudent/:id':'AppController.editStudent',

  //-------------------------------
  //
  '/newCourse': 'AppController.newCourse',
  '/listCourses': 'AppController.listCourses',
  '/editCourse/:id':'AppController.editCourse',
  //-------------------------------
  //
  '/newSubject': 'AppController.newSubject',
  '/listSubjects': 'AppController.listSubjects',
  '/editSubject/:id':'AppController.editSubject',
  //-------------------------------
  //
<<<<<<< HEAD
  '/newHomework': 'AppController.newHomework',
  '/assignHomework': 'AppController.assignHomework'
 // '/listSubjects': 'AppController.listSubjects',
  //'/editSubject/:id':'AppController.editSubject',
=======
  '/listHomeworks': 'AppController.listHomeworks',
  '/homework/:id':'AppController.viewHomework'  
  //-------------------------------
  //
>>>>>>> ff46c65191565c3b9a6ecc76803b9d392115f0f6



  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
