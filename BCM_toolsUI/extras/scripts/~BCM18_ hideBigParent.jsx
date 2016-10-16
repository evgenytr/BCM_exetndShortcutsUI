/*<javascriptresource>  <name>BCM18> hideBigParent...</name>  <category>BCM</category></javascriptresource>*//////////////////////////////////////////////*Author: Buliarca Cristian (buliarca@yahoo.com)Copyright (C) 2013 Buliarca Cristianhttp://buliarca.blog124.fc2.com/http://buliarcatools.blog.fc2.com/Installation:  Close Photoshop  and copy the script in your Photoshop scripts folder:    "c:\Program Files\Adobe\Adobe Photoshop CS5 (64 Bit)\Presets\Scripts"   for osx:  "/Applications/Adobe Photoshop CS6/Presets/Scripts/"    Then restart Photoshop and you will see the scripts in the File>Scripts menuVersion: 1.0Function:  this script opens a window where you can type the layer name that you want to select and it will  return a list of corresponding layers  To search you can type only a part of the layer name  Also if you want to select a layer that's in a group you can type first the layer name  or a part of it, followed by "@" and the group name    example: ao@DIF (this will list only the layers that are in the DIFFUSE group and have "ao"    inside the name)  For default the script will select only one layer, the first layer found.  You can see the layer that will be selected is the layer highlighted in the list bellow the typing  field.  If you want more than one layer to be selected you have to select them in the list  You can also type at the end of your searching string the "*" this will select all your results  Beside mouse navigation you can use some shortcut keys to navigate in the window  To switch between the typing field and the resulting list use the Tab key  To select in the list press Shift or Ctrl  To close the window and select the results press Enter  To close the window without selecting anything press Esc  Tested and works in photoshop versions:   CS3, CS4, CS5, CS6, CC  in CS6 on the osx system after closing the script Photoshop crashes to avoid this   you will have to change the line number 74 with this:  var mbSimpleSwitch = true;//make this true if you have problems with the UI  Use and/or modify at your own risk.*/////////////////////////////////////////////#include "../../../_main/extras/_libs/layerIdAM.jsxinc"function main(){  var cL = getSelectedLayersIdx();    var prnts = new Array();  var noparents = 0;  var oldPrntID = 0;  for(var f=0; f<cL.length; f++){        var p = getParents(cL[f])[0];//get main parents for each selected layer        if(p != undefined){//there is no parent for the selected layers            noparents ++;//this will add one so there are parents            //if more layers selected from the same parent save just one parent          if(oldPrntID != p.id){            prnts.push(p);            oldPrntID = p.id;          }        }  }  for(var t=0; t<prnts.length;t++){    if(getVisibleforID(prnts[t].id) == false){      showByID(prnts[t].id);    }else{      hideByID(prnts[t].id);    }  }}function getParents( idx ){  xx = false;  var count  = getLayersNb();   currINDEX = idx;    var parents = [];    var i = currINDEX+1;  //adding the selected obj if that is a layerGroup        ref0 = new ActionReference();        ref0.putIndex( charIDToTypeID( 'Lyr ' ), idx );        var desc0 = executeActionGet(ref0);        var layerName0 = desc0.getString(charIDToTypeID( 'Nm  ' ));        var Id0 = desc0.getInteger(stringIDToTypeID( 'layerID' ));        var ls0 = desc0.getEnumerationValue(stringIDToTypeID("layerSection"));        ls0 = typeIDToStringID(ls0);        var vis0 = desc0.getInteger(stringIDToTypeID( 'visible' ));        if(ls0 == "layerSectionStart"){          var objPar0 = {id:Id0, idx:idx, name:layerName0, vis:vis0};            parents.push(objPar0);        }    var nb = NaN;    var x = 0;    var y = 0;    var r = 0;    var pp = -1;    // alert(i + " count: "+count);   for(i; i <= count ; i++){        ref = new ActionReference();        ref.putIndex( charIDToTypeID( 'Lyr ' ), i );        var desc = executeActionGet(ref);        var layerName = desc.getString(charIDToTypeID( 'Nm  ' ));        var Id = desc.getInteger(stringIDToTypeID( 'layerID' ));        var ls = desc.getEnumerationValue(stringIDToTypeID("layerSection"));        ls = typeIDToStringID(ls);        var vis = desc.getInteger(stringIDToTypeID( 'visible' ));        if(ls == "layerSectionEnd"){x++};        if(ls == "layerSectionStart")          {            y++;          }        r = x - y;        // alert(ls +" r:: "+ r + " i:: "+ i + " name:: "+layerName);        if(r == pp && ls == "layerSectionStart")        {          var objPar = {id:Id, idx:i, name:layerName, vis:vis};          parents.push(objPar);          // alert(":::: "+layerName);          pp --;          // break;        }      }    return parents.reverse();}function getLayersNb()//function to find out if the number of layers in the document{    var ref = new ActionReference();    ref.putProperty( charIDToTypeID( 'Prpr' ), stringIDToTypeID('numberOfLayers') );    ref.putEnumerated( charIDToTypeID( "Dcmn" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );    var desc = executeActionGet(ref);    var numberOfLayers = desc.getInteger(stringIDToTypeID('numberOfLayers'));    return numberOfLayers;}main();