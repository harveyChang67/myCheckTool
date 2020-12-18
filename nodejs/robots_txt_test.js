const util = require('util');
var parse = require('robots-txt-parse'),
    fs = require('fs');

const test_url = require(__dirname + '/data/robots_txt_test.json');

/**
 *  parse robots.txt
 */
// const fs_robots = require('fs');
// const robots_filename = `output/robots.json`;
// fs_robots.openSync(robots_filename, 'w');
//
//
// parse(fs.createReadStream(__dirname + '/robots.txt'))
//     .then(function (robots) {
//             fs_robots.writeFileSync(robots_filename, JSON.stringify(robots), function (err) {
//                 if (err) {
//                     return console.log(err);
//                 }
//                 console.log("The file was saved!");
//             });
//         },fs_robots
//     );
//
// var tt = fs_robots.readFile(robots_filename, function (err, data) {
//     if (err) throw err;
//
//     console.log(data.toString());
// });
// console.log(tt);
//

/**
 *  rules in robots.txt -> validate urls
 */
var guard = require('robots-txt-guard');

var robotsTxt = guard(
    {
        groups: [{
            agents: ['*'],
            rules:
                [{rule: 'disallow', path: '/kanri/'},
                    {rule: 'disallow', path: '/admin'},
                    {rule: 'disallow', path: '/recruit/entry/'},
                    {rule: 'disallow', path: '/*?y='},
                    {rule: 'disallow', path: '/*/news/*?category='},
                    {rule: 'disallow', path: '/*/blog/*?date='},
                    {rule: 'disallow', path: '/*/blog/*?month='},
                    {rule: 'disallow', path: '/*/search_result/'},
                    {rule: 'disallow', path: '/*/ensen_search/'},
                    {rule: 'disallow', path: '/*?utm'},
                    {rule: 'disallow', path: '/notebook/preview/'},
                    {rule: 'disallow', path: '/notebook/*/?preview=true'},
                    {
                        rule: 'disallow',
                        path: '/*/station*/girlssearch/girlsranking/?sokuiku=0&*'
                    },
                    {
                        rule: 'disallow',
                        path: '/*/station*/girlssearch/girlsranking/?sokuiku=2&*'
                    },
                    {
                        rule: 'disallow',
                        path: '/*/local*/girlssearch/girlsranking/?sokuiku=0&*'
                    },
                    {
                        rule: 'disallow',
                        path: '/*/local*/girlssearch/girlsranking/?sokuiku=2&*'
                    },
                    {rule: 'disallow', path: '/*/girlssearch/?*'},
                    {rule: 'disallow', path: '/*/local*/ranking/'},
                    {rule: 'disallow', path: '/*/local*/*/ranking/'},
                    {rule: 'disallow', path: '/*/station*/ranking/'},
                    {rule: 'disallow', path: '/*/station*/*/ranking/'},
                    {rule: 'disallow', path: '/*/genre*/list/'},
                    {rule: 'disallow', path: '/*/price*/list/'},
                    {rule: 'disallow', path: '/*/genre*/price*/list/'},
                    {rule: 'allow', path: '/member/login/'}
                ]
        },
            {agents: ['bingBot'], rules: []},
            {agents: ['AhrefsBot'], rules: []}]
    }
);


/**
 *  output result
 */
var fs_output = require('fs');
var file = fs_output.createWriteStream(__dirname + '/data/robots_txt_test_output.txt');
file.on('error', function (err) {
    Console.log(err)
});

test_url.forEach(value => file.write(`${(robotsTxt.isAllowed('Googlebot', value)) ? '(O)' : '(X)'}${value}\r\n`));
