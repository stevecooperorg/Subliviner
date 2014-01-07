An attempt to build software for composing and compiling novels, something like Scrivener, but using Sublime Text as the IDE and Multimarkdown as the markup language. 

Strongly inspired by [Scrivener](), and [this article by Ian Hocking](http://ianhocking.com/2013/06/22/writing-a-novel-using-markdown/).

It currently runs as a node.js grunt task.

# To Install;

- Install Node.js (I wrote this on v0.10.21) if you haven't already got it.
- Clone this repo. 
- `npm install -i grunt-cli` to get the grunt task runner, if you haven't already got it.
- Open a command window in `c:\wherever\you\cloned\the\repo\Compiler` and run `npm install` the packages. 

# To Write the Novel;

Create a folder structure with the following shape;

    .
      manuscripts/
         firstDraft/
           01.front matter.mmd
           02.chapter 1.mmd
           02.01 scene 1.mmd
           02.02 scene 2.mmd
           03.chapter 2.mmd
         secondDraft/
           01.chapter 1.mmd
         fragments/

I edit the files in sublime text, where the 'Project' feature can be used to manage your manuscripts. Just add the root folder here to a blank project; this should show the files in the Side Bar, the same way the binder shows the document structure in Scrivener. 

Under this structure, though, this allows many different manuscripts. I use this for different drafts, story notes, scraps and fragments, etc. 

# To Run;

On the command line;

    grunt --gruntfile="c:\wherever\you\cloned\the\repo\Compiler\gruntfile.js" --root="c:\wherever\your\novel\lives" watch

This will start a processor running in the background. Whenever you edit a markdown file, it'll concatenate the files in each subfolder of 'manuscripts' and run it through multimarkdown. You should end up with a structure like this;

    .
      manuscripts/
         firstDraft/
           01.front matter.mmd
           02.chapter 1.mmd
           02.01 scene 1.mmd
           02.02 scene 2.mmd
           03.chapter 2.mmd
         secondDraft/
           01.chapter 1.mmd
         fragments/
      01.working/
         firstDraft.mmd
         secondDraft.mmd
         fragments.mmd
      02.Production/
         firstDraft.html
         secondDraft.html
         fragments.html
