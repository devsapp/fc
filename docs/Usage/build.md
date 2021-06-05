```

Build 

  Build the dependencies.

Usage

  $ s build <options> 

Options

  -l, --language   string   Sprcify the language, include python2.7, python3.6, nodejs6, nodejs8, nodejs12, golang1, java8, java10
  -f, --dockerfile string   Specify the dockerfile path
  -d, --use-docker string   Use docker container to build functions

Global Options

  -y, --assume-yes    Assume that the answer to any question which would be asked is yes. 
  -h, --help          Display help for command.                                           

Examples with Yaml

  $ s build
  $ s <ProjectName> build
  $ s build --use-docker 
  $ s exec -- build --use-docker 

Examples with CLI

  $ s cli fc build --use-docker 

```
