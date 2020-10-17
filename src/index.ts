#! /usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as inquirer from 'inquirer';
import * as chalk from 'chalk';

export interface CliOptions {
	projectName: string;
	templateName: string;
	templatePath: string;
	targetPath: string;
}

const currentDir = process.cwd();

const Options = fs.readdirSync(path.join(__dirname, 'templates'));

const Questions = [
	{
		name: 'template',
		type: 'list',
		message: 'Choose project template:',
		choices: Options,
	},
	{ name: 'name', type: 'input', message: 'Project name:' },
];
inquirer.prompt(Questions).then((answers) => {
	const projectChoice = answers['template'];
	const projectName = answers['name'];
	const templatePath = path.join(__dirname, 'templates', projectChoice);
	const targetPath = path.join(currentDir, projectName);

	const options: CliOptions = {
		projectName,
		templateName: projectChoice,
		templatePath,
		targetPath,
	};

	// console.log(`options:`, options);

	if (!createProject(targetPath)) {
		return;
	}
});

function createProject(projectPath: string) {
	if (fs.existsSync(projectPath)) {
		console.log(chalk.red(`Folder ${projectPath} exists.`));
		return false;
	}

	fs.mkdirSync(projectPath);

	return true;
}
