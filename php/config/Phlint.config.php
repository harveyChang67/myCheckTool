<?php
//	Phlint - PHP Code Analyzer
//	Usage:  phlint analyze -c <this file> file/path

return function ($phlint) {

	// Autoload composer dependencies.
	$phlint[] = new \phlint\autoload\Composer(__dir__ . '/composer.json');

//	$phlint->removeRule('shortOpenTag');		// Remove a certain (undesired) rule.
	$phlint->disableRule('shortOpenTag');
	$phlint->disableRule('name');
	$phlint->disableRule('phpDoc');
	$phlint->disableRule('operandCompatibility');

	$phlint->enableRule('variableInitialization');


	// Include a path to be analyzed.
//	$phlint->addPath(__dir__ . '/src');

};

