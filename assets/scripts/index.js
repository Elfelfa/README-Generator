// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

const licenseNames = [
    'None',
    'Apache 2.0 License',
    'Boost Software License 1.0',
    'BSD 3-Clause License',
    'BSD 2-Clause License',
    'CC0',
    'Attribution 4.0 International',
    'Attribution-ShareAlike 4.0 International',
    'Attribution-NonCommercial 4.0 International',
    'Attribution-NoDerivates 4.0 International',
    'Attribution-NonCommmercial-ShareAlike 4.0 International',
    'Attribution-NonCommercial-NoDerivatives 4.0 International',
    'Eclipse Public License 1.0',
    'GNU GPL v3',
    'GNU GPL v2',
    'GNU AGPL v3',
    'GNU LGPL v3',
    'GNU FDL v1.3',
    'The Hippocratic License 2.1',
    'The Hippocratic License 3.0',
    'IBM Public License Version 1.0',
    'ISC License (ISC)',
    'The MIT License',
    'Mozilla Public License 2.0',
    'Attribution License (BY)',
    'Open Database License (ODbL)',
    'Public Domain Dedication and License (PDDL)',
    'The Perl License',
    'The Artistic License 2.0',
    'SIL Open Font License 1.1',
    'The Unlicense',
    'The Do What the Fuck You Want to Public License',
    'The zlib/libpng License'
];

const licenses = [
    'None',
    'Apache 2.0 License~[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
    'Boost Software License 1.0~[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)',
    'BSD 3-Clause License~[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
    'BSD 2-Clause License~[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)',
    'CC0~[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)',
    'Attribution 4.0 International~[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)',
    'Attribution-ShareAlike 4.0 International~[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)',
    'Attribution-NonCommercial 4.0 International~[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)',
    'Attribution-NoDerivates 4.0 International~[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC_BY--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nd/4.0/)',
    'Attribution-NonCommmercial-ShareAlike 4.0 International~[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)',
    'Attribution-NonCommercial-NoDerivatives 4.0 International~[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC_BY--NC--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)',
    'Eclipse Public License 1.0~[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)',
    'GNU GPL v3~[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
    'GNU GPL v2~[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)',
    'GNU AGPL v3~[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)',
    'GNU LGPL v3~[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)',
    'GNU FDL v1.3~[![License: FDL 1.3](https://img.shields.io/badge/License-FDL_v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)',
    'The Hippocratic License 2.1~[![License: Hippocratic 2.1](https://img.shields.io/badge/License-Hippocratic_2.1-lightgrey.svg)](https://firstdonoharm.dev)',
    'The Hippocratic License 3.0~[![License: Hippocratic 3.0](https://img.shields.io/badge/License-Hippocratic_3.0-lightgrey.svg)](https://firstdonoharm.dev)',
    'IBM Public License Version 1.0~[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)',
    'ISC License (ISC)~[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)',
    'The MIT License~[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
    'Mozilla Public License 2.0~[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)',
    'Attribution License (BY)~[![License: Open Data Commons Attribution](https://img.shields.io/badge/License-ODC_BY-brightgreen.svg)](https://opendatacommons.org/licenses/by/)',
    'Open Database License (ODbL)~[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)',
    'Public Domain Dedication and License (PDDL)~[![License: ODbL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/)',
    'The Perl License~[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)',
    'The Artistic License 2.0~[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic_2.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)',
    'SIL Open Font License 1.1~[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL_1.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)',
    'The Unlicense~[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)',
    'The Do What the Fuck You Want to Public License~[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)',
    'The zlib/libpng License~[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)'
];


// TODO: Create a function to initialize app
function init() {
    // TODO: Create an array of questions for user input
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Input a title: ',
                name: 'title',
            },
            {
                type: 'input',
                message: 'Input a description: ',
                name: 'description',
            },
            {
                type: 'input',
                message: 'Input your installations instructions: ',
                name: 'installation',
            },
            {
                type: 'input',
                message: 'Input your usage information: ',
                name: 'usage',
            },
            {
                type: 'input',
                message: 'Input your contributors with a comma between each name: ',
                name: 'contributors',
            },
            {
                type: 'input',
                message: 'Input your test instructions: ',
                name: 'test',
            },
            {
                type: 'list',
                message: 'Which license are you using?',
                default: licenseNames[0],
                choices: licenseNames,
                name: 'license'
            },
            {
                type: 'input',
                message: 'Input your GitHub username: ',
                name: 'ghUsername',
            },
            {
                type: 'input',
                message: 'Input your e-mail address: ',
                name: 'email',
            },
        ])
        .then((response) => {

            for (let i = 0; i < licenses.length; i++){
                if (licenses[i].includes(response.license)){
                    lBadge = licenses[i].replace(`${response.license}`+`~`, '');
                    break;
                }
            };
    
            rmText = `# ${response.title}\n\n## Table of Contents\n\n[Description](#description)\n[Installation](#installation)\n[Usage](#usage)\n[License](#license)\n[Contributors](#contributors)\n[Tests](#tests)\n[Questions](#questions)\n\n## Description\n\n${lBadge}\n\n${response.description}\n\n## Installation\n\n${response.installation}\n\n ## Usage\n\n${response.usage}\n\n## License\n\nThis project uses: ${response.license}\n\n## Contributors\n\n${response.contributors}\n\n## Tests\n\n${response.tests}\n\n## Questions\n\nGitHub: [https://github.com/${response.ghUsername}](https://github.com/${response.ghUsername})\n\nIf you have any questions you can reach me at my email: ${response.email}`;            

            fs.writeFile('../../output/README.txt', rmText, (err) =>
                err ? console.error(err) : console.log('README created!')
            );
        });
}

// Function call to initialize app
init();
