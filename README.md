d3.js example extensions in QlikView.

** Extensions Working on:
-Barchart
-Parrallel Coordinates



Adding Extensions:

Installation-
Extensions are contained in a qar file.  This file can be adding to your qlikview file by just opening the file in the Desktop version of Qlikview.  You can also add the 
extension manually to your Desktop edition of Qlikview by copying the file to %USERPROFILE%\AppData\Local\QlikTech\QlikView\Extensions\Objects\;
In order to use the extension on the Qlikview Server, please copy the extension to %ProgramData%\QlikTech\QlikViewServer\Extensions\Objects

Adding to a QVW-
Open the Qlikview file you that you want to add the d3 extension.  Click on Settings -> Document Properties to get to the Document properties screen.
Next, click on Extensions to get a list of installed extensions on your computer and a list of extensions that are used by the document.  You will need to click on 
"d3 Extension for Qlikview" under the Installed Extensions listbox and then click "Add>" in order to add the extension library to your Qlikview file.  Click "Ok" when you are done with the
document properites screen.

Now, we will turn on the Webview by clicking on View -> Turn on/off Webview.  Your dashboard will probably refresh and then be displayed in a web preview.  You can right click on an empty 
space and then select "New Sheet Object".  The screen overlay shows a list of standard QlikView objects, but we want to expand the "Extension Objects" section.  Find the "d3 Extension for Qlikview" and drag the 
object to the dashboard.
