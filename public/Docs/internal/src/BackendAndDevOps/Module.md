## Create a New Module

### Create folder and register module
- Duplicate the example module Skel and rename de folter to the {NEW_MODULE}
- Set the namespace into `$CLIPP_PATH/Backend/module/{NEW_MODULE}/Module.php`
- Register the tests in `autoload-dev` and into `$CLIPP_PATH/Backend/phpunit.xml.dist`
- Register the model access according to the database into the Entity Manager `$CLIPP_PATH/Backend/module/Core/src/Core/EntityManager.php` (main database into `factory()`, fiscal database into `fiscal()`, storage database into `storage()`)
- Register the module in `Backend/config/application.config.php` and `Backend/config/test.config.php`
- Register the new module in the PSR-4 autoload into `$CLIPP_PATH/Backend/composer.json` (path until src `module/{NEW_MODULE}/src`)
- Update the composer: `cd $CLIPP_PATH/Backend && composer update`


### To register views and emails
- go to `$CLIPP_PATH/Backend/config/autoload/global.php`
- add path into `view_path_stack` and `email_path_stack`

### To register services and set global config values
- `$CLIPP_PATH/Backend/module/{NEW_MODULE}/config/module.config.php`

### To register endpoints and consumers
- `$CLIPP_PATH/Backend/module/{NEW_MODULE}/config/service.config.php`

### To add to code coverage
- `$CLIPP_PATH/Backend/coverage.xml`
