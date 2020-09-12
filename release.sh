#!/bin/bash
if git diff-index --quiet HEAD --; then

    # Checkout develop
    git checkout develop 1> /dev/null
    git pull 1> /dev/null
    echo "Checked out develop branch"

    # Run interactive release
    npm run create-release
    echo "New tag and release created"

    # Merge develop into master
    git checkout master 1> /dev/null
    git pull origin master 1> /dev/null
    git merge develop 1> /dev/null
    git push origin master 1> /dev/null
    echo "Merged develop into master"

    # Pull from master into develop
    git checkout develop 1> /dev/null
    git pull origin master 1> /dev/null
     git push origin develop 1> /dev/null
    echo "DEVELOP branch now has latest changes from master"

    echo
    echo "Current git status:"
    echo
    git status

    echo
    echo "** Release completed **"
    echo

else
    printf "ERROR Working dir must be clean.\nPlease stage and commit your changes.\n\n";
fi