#! /usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import * as template from './utils/template';
import shell from 'shelljs';
import * as yargs from 'yargs';

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
		when: () => !yargs.argv['template'],
	},
	{
		name: 'name',
		type: 'input',
		message: 'Project name:',
		when: () => !yargs.argv['name'],
	},
];
const skipFiles = ['node_modules', '.template.json'];

inquirer.prompt(Questions).then((answers) => {
	answers = Object.assign({}, answers, yargs.argv);

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

	if (!createProject(targetPath)) {
		return;
	}

	createDirectoryContents(templatePath, projectName);

	postProcess(options);
});

function createProject(projectPath: string) {
	if (fs.existsSync(projectPath)) {
		console.log(chalk.red(`Folder exists: ${projectPath}`));
		return false;
	}

	fs.mkdirSync(projectPath);

	return true;
}

function createDirectoryContents(templatePath: string, projectName: string) {
	const filesToCreate = fs.readdirSync(templatePath);

	filesToCreate.forEach((file) => {
		const originFilePath = path.join(templatePath, file);
		const stats = fs.statSync(originFilePath);

		if (skipFiles.indexOf(file) > -1) return;

		if (stats.isFile()) {
			let contents = fs.readFileSync(originFilePath, 'utf-8');
			contents = template.render(contents, { projectName });

			const writePath = path.join(currentDir, projectName, file);

			fs.writeFileSync(writePath, contents, 'utf-8');
		} else if (stats.isDirectory()) {
			fs.mkdirSync(path.join(currentDir, projectName, file));
			createDirectoryContents(
				path.join(templatePath, file),
				path.join(projectName, file),
			);
		}
	});
}

function postProcess(options: CliOptions) {
	const isNode = fs.existsSync(path.join(options.templatePath, 'package.json'));
	if (isNode) {
		shell.cd(options.targetPath);

		const result = shell.exec('yarn');
		if (result.code !== 0) {
			return false;
		}
	}

	return true;
}
