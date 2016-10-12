// Generated on 2014-10-06 using generator-angular 0.9.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };
  //
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-cdnify');
  grunt.loadNpmTasks('grunt-protractor-runner');
//    grunt.loadNpmTasks('grunt-bower-concat');
  // Define the configuration for all the tasks
  grunt.initConfig({

//    bower_concat:{
//        all: {
//            dest: '<%= yeoman.dist %>/scripts/scripts.js',
////            callback: function (mainFiles, component) {
////                return _.map(mainFiles, function (filepath) {
////                    // Use minified files if available
////                    var min = filepath.replace(/\.js$/, '.min.js');
////                    return grunt.file.exists(min) ? min : filepath;
////                });
////            }
//          }
//    },

    // Project settings
    yeoman: appConfig,

    //environmental settings
    replace: {
      dev: {
        options: {
          patterns: [{
            json: grunt.file.readJSON('./config/environments/dev.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['config/envconfig.js'],
          dest: '<%= yeoman.app %>/scripts/Utilities/environment/'
        }]
      },
      devIndex: {
        options: {
          patterns: [{
            match: 'googleTagManagerID',
            replacement: 'GTM-5ZBFG3'
          },
            {
              match: 'segmentIOId',
              replacement: 'nhgu5Vc8cAG5W2TinfWWITZZsM1wZbAm'
            },
            {
              match: 'logglyKey',
              replacement: 'e0a36639-e128-4e7e-b594-c7a5621c1d6f/tag/dev-multi-journey/'
            },
            {
              match: 'appDynamics',
              replacement: 'QAadrum.js'
            },
            {
              match: 'qualaroo',
              replacement: '//s3.amazonaws.com/ki.js/61466/elj.js'
            }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['<%= yeoman.app %>/index.html'],
          dest: '<%= yeoman.app %>/'
        }]
      },
      qa1: {
        options: {
          patterns: [{
            json: grunt.file.readJSON('./config/environments/qa-1.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['config/envconfig.js'],
          dest: '<%= yeoman.app %>/scripts/Utilities/environment/'
        }]
      },
      qa2: {
        options: {
          patterns: [{
            json: grunt.file.readJSON('./config/environments/qa-2.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['config/envconfig.js'],
          dest: '<%= yeoman.app %>/scripts/Utilities/environment/'
        }]
      },
      prod1: {
        options: {
          patterns: [{
            json: grunt.file.readJSON('./config/environments/prod-1.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['config/envconfig.js'],
          dest: '<%= yeoman.app %>/scripts/Utilities/environment/'
        }]
      },
      prodIndex: {
        options: {
          patterns: [{
            match: 'googleTagManagerID',
            replacement: 'GTM-PVRX'
          },
            {
              match: 'segmentIOId',
              replacement: 'QHXIvIcV5Ua2Njf9kQY4xudsLFWPryZw'
            },
            {
              match: 'logglyKey',
              replacement: 'e0a36639-e128-4e7e-b594-c7a5621c1d6f/tag/prod-multi-journey/'
            },
            {
              match: 'appDynamics',
              replacement: 'PRODadrum.js'
            },
            {
              match: 'qualaroo',
              replacement: '//s3.amazonaws.com/ki.js/61466/dYx.js'
            }
          ]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['<%= yeoman.app %>/index.html'],
          dest: '<%= yeoman.app %>/'
        }]
      },
      ci: {
        options: {
          patterns: [{
            json: grunt.file.readJSON('./config/environments/ci.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['config/envconfig.js'],
          dest: '<%= yeoman.app %>/scripts/Utilities/environment/'
        }]
      },
      partnerTest: {
        options: {
          patterns: [{
            json: grunt.file.readJSON('./config/environments/partner-test.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['config/envconfig.js'],
          dest: '<%= yeoman.app %>/scripts/Utilities/environment/'
        }]
      },
      xDomainCI: {
        options: {
          patterns: [
            {
              json: {"xDomainPlaceHolder1": "'https://eaa-ci.qa-pachyderm.com': '/proxy.html'"}
            },
            {
              json: {"xDomainPlaceHolder2": "'https://eia-ci.qa-pachyderm.com': '/proxy.html'"}
            },
            {
              json: {"xDomainPlaceHolder3": "'https://eea-ci.qa-pachyderm.com': '/proxy.html'"}
            },
            {
              json: {"xDomainPlaceHolder4": "'https://ms-quote-intent-ci.qa-pachyderm.com': '/proxy.html'"}
            }
          ]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['<%= yeoman.app %>/index.html'],
          dest: '<%= yeoman.app %>/'
        }]
      },
      xDomainQA1: {
        options: {
          patterns: [
            {
              json: {"xDomainPlaceHolder1": "'https://eaa-qa1.qa-pachyderm.com': '/proxy.html'"}
            },
            {
              json: {"xDomainPlaceHolder2": "'https://eia-qa1.qa-pachyderm.com': '/proxy.html'"}
            },
            {
              json: {"xDomainPlaceHolder3": "'https://eea-qa1.qa-pachyderm.com': '/proxy.html'"}
            },
            {
              json: {"xDomainPlaceHolder4": "'https://ms-quote-intent-qa1.qa-pachyderm.com': '/proxy.html'"}
            }
          ]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['<%= yeoman.app %>/index.html'],
          dest: '<%= yeoman.app %>/'
        }]
      },
      xDomainQA2: {
        options: {
          patterns: [
            {
              json: {"xDomainPlaceHolder1": "'https://eaa-qa2.qa-pachyderm.com': '/proxy.html'"}
            },
            {
              json: {"xDomainPlaceHolder2": "'https://eia-qa2.qa-pachyderm.com': '/proxy.html'"}
            },
            {
              json: {"xDomainPlaceHolder3": "'https://eea-qa2.qa-pachyderm.com': '/proxy.html'"}
            },
            {
              json: {"xDomainPlaceHolder4": "'https://ms-quote-intent-qa2.qa-pachyderm.com': '/proxy.html'"}
            }
          ]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['<%= yeoman.app %>/index.html'],
          dest: '<%= yeoman.app %>/'
        }]
      },
      xDomainPROD1: {
        options: {
          patterns: [
            {
              json: {"xDomainPlaceHolder1": "'https://eaa.pachyderm.com': '/proxy.html'"}
            },
            {
              json: {"xDomainPlaceHolder2": "'https://eia.pachyderm.com': '/proxy.html'"}
            },
            {
              json: {"xDomainPlaceHolder3": "'https://eea.pachyderm.com': '/proxy.html'"}
            },
            {
              json: {"xDomainPlaceHolder4": "'https://ms-quote-intent.pachyderm.com': '/proxy.html'"}
            }
          ]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['<%= yeoman.app %>/index.html'],
          dest: '<%= yeoman.app %>/'
        }]
      },
      xDomainPartnerTest: {
        options: {
          patterns: [
            {
              json: {"xDomainPlaceHolder1": "'https://eaa-partner-test.qa-pachyderm.com': '/proxy.html'"}
            },
            {
              json: {"xDomainPlaceHolder2": "'https://eia-partner-test.qa-pachyderm.com': '/proxy.html'"}
            },
            {
              json: {"xDomainPlaceHolder3": "'https://eea-partner-test.qa-pachyderm.com': '/proxy.html'"}
            },
            {
              json: {"xDomainPlaceHolder4": "'https://ms-quote-intent-partner-test.qa-pachyderm.com': '/proxy.html'"}
            }
          ]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['<%= yeoman.app %>/index.html'],
          dest: '<%= yeoman.app %>/'
        }]
      }
    },

    ////// Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9010,
        // Change this to '0.0.0.0' to access the server from outside.
        //  hostname: 'localhost',
        hostname: '0.0.0.0',
        // livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        exclude: [/jquery/, '/angular/angular.js'],
        ignorePath: /\.\.\//

      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n',
        specify: '<%= yeoman.app %>/styles/main.scss'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      //completely bust cache for qa purposes
      //options: {
      //  process: function(base, name, extension){
      //    return base.concat(name, '.' + Date.now(), '.' + extension);
      //  }
      //},
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
//          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
//          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },
    // gzip assets 1-to-1 for production
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        files: [
          {expand: true, cwd: '<%= yeoman.dist %>/scripts', src: ['*'], dest: '<%= yeoman.dist %>/scripts/min'},
          {expand: true, cwd: '<%= yeoman.dist %>/styles', src: ['*'], dest: '<%= yeoman.dist %>/styles/min'}
        ]
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images']
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    ngtemplates: {
      app: {
        cwd: 'app',
        src: [
          'views/**.html',
          'views/platform/**.html',
          'views/prefill/**/*.html',
          'views/quotes/**.html',
          'views/quotes/modals/**.html',
          'views/quotes/directives/**.html',
          'scripts/appEntryPoints/views/**.html',
          'scripts/appEntryPoints/views/**/**.html',
          'scripts/components/pages/**/**.html',
          'scripts/customerJourneys/**/config/**.json',
          'scripts/customerJourneys/**/pages/**/**.html',
          'scripts/directives/views/**.html',
          'scripts/services/platform/**/**/**.html',
          //'scripts/services/platform/Idle/templates/**.html',
          'scripts/Utilities/**.html',
          'scripts/Utilities/**/**.json'
          //'scripts/controllers/quotes/journeys/journey.json'
        ],
        dest: '<%= yeoman.dist %>/scripts/templates.js',
        options: {
          prefix: '../',
          bootstrap: function (module, script) {
            return 'angular.module("templates", []).run(["$templateCache", function($templateCache){' + script + '}]);';
          },
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true, // Only if you don't use comment directives!
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          },
          usemin: 'scripts/templates.js' //from  <!--build:js--> block
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: ['*.js', '!oldieshim.js'],
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    cdnify: {
      ci: {
        options: {
          base: grunt.file.readJSON('./config/environments/ci.json').cdnBase
        },
        files: [
          {
            expand: true,
            cwd: 'dist',
            src: '**/*.{css,html}',
            dest: 'dist'
          },
          {
            expand: true,
            cwd: 'dist',
            src: 'scripts/templates.*.js',
            dest: 'dist'
          }]
      },
      qa1: {
        options: {
          base: grunt.file.readJSON('./config/environments/qa-1.json').cdnBase
        },
        files: [
          {
            expand: true,
            cwd: 'dist',
            src: '**/*.{css,html}',
            dest: 'dist'
          },
          {
            expand: true,
            cwd: 'dist',
            src: 'scripts/templates.*.js',
            dest: 'dist'
          }]
      },
      qa2: {
        options: {
          base: grunt.file.readJSON('./config/environments/qa-2.json').cdnBase
        },
        files: [
          {
            expand: true,
            cwd: 'dist',
            src: '**/*.{css,html}',
            dest: 'dist'
          },
          {
            expand: true,
            cwd: 'dist',
            src: 'scripts/templates.*.js',
            dest: 'dist'
          }]
      },
      prod1: {
        options: {
          base: grunt.file.readJSON('./config/environments/prod-1.json').cdnBase
        },
        files: [
          {
            expand: true,
            cwd: 'dist',
            src: '**/*.{css,html}',
            dest: 'dist'
          },
          {
            expand: true,
            cwd: 'dist',
            src: 'scripts/templates.*.js',
            dest: 'dist'
          }]
      },
      partnerTest: {
        options: {
          base: grunt.file.readJSON('./config/environments/partner-test.json').cdnBase
        },
        files: [
          {
            expand: true,
            cwd: 'dist',
            src: '**/*.{css,html}',
            dest: 'dist'
          },
          {
            expand: true,
            cwd: 'dist',
            src: 'scripts/templates.*.js',
            dest: 'dist'
          }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
//          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            //'views/{,*/}*.html',
            //'views/quotes/directives/*',
//            'styles/images/{,*/}*.{webp}',

            'styles/images/*',
            'images/*'
            //'styles/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= yeoman.dist %>'
        },
          {
            expand: true,
            cwd: '<%= yeoman.app %>',
            src: 'scripts/Utilities/*.json',
            dest: '<%= yeoman.dist %>'
          },
          //{
          //  expand: true,
          //  cwd: '<%= yeoman.app %>',
          //  dest: '<%= yeoman.dist %>',
          //  src: [
          //    //'scripts/controllers/quotes/journeys/*',
          //    'scripts/marketing/*'
          //  ]
          //},
          {
            expand: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              //'scripts/controllers/quotes/journeys/*',
              'scripts/marketing/*'
            ]
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>/fonts',
            flatten: true,
            src: [
              'styles/fonts/*'
            ]
          }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        //'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },
    protractor: {
      options: {
        configFile: "test/protractor.conf.js", // Default config file
        keepAlive: false,
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          suite: 'va',
          params: {
            config: {
              testToExecute: '["NB-1"]',
              autoGen: true
            }
          }
        }
      },
      all: {}
    }
  });

  grunt.registerTask('qa1-build', [
    'replace:qa1',
    'replace:xDomainQA1',
    'replace:devIndex',
    'compass',
    'build',
    'cdnify:qa1',
    'compress'
  ]);

  grunt.registerTask('qa2-build', [
    'replace:qa2',
    'replace:xDomainQA2',
    'replace:devIndex',
    'compass',
    'build',
    'cdnify:qa2',
    'compress'
  ]);

  grunt.registerTask('prod1-build', [
    'replace:prod1',
    'replace:xDomainPROD1',
    'replace:prodIndex',
    'compass',
    'build',
    'cdnify:prod1',
    'compress'
  ]);

  grunt.registerTask('ci-build', [
    'replace:ci',
    'replace:xDomainCI',
    'replace:devIndex',
    'compass',
    'build',
    'cdnify:ci',
    'compress'
  ]);

  grunt.registerTask('default', [
    'replace:ci',
    'replace:devIndex',
    'compass',
    'build'
  ]);

  grunt.registerTask('partner-test-build',[
    'replace:partnerTest',
    'replace:xDomainPartnerTest',
    'replace:devIndex',
    'compass',
    'build',
    'cdnify:partnerTest',
    'compress'
  ]);

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      //'ngtemplates',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test:unit', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('test:e2e', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'protractor'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'ngtemplates',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    //'bower_concat',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'

  ]);

//  grunt.registerTask('default', [
//    'newer:jshint',
//    'test',
//    'build'
//  ]);
};
