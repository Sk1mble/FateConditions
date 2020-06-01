Hooks.off();
Hooks.on ('renderExtraSheet', async (data) => {
    // Let's do some stuff if this extra is a Condition and we haven't already created the boxes for it.
    var extra = data.object;
    var actor = data.actor;

    //Split the condition name and number of boxes
    var split = extra.data.name.split("_");
    
    if (split.length >1){
        //This means we haven't initialised this field yet.
        var name = split[0];
        var boxes = split[1];
        var boxString="";
        for (let i = 0; i<boxes; i++){
            boxString += `<input type="checkbox" data-id="${name}"></input>`;
        }
        await actor.updateEmbeddedEntity("OwnedItem", {
            _id:extra._id,
            name:`${name}`,
            "data.description.value":`${boxString}`
        });
    }
})

Hooks.on ('closeExtraSheet', async (data) => {
    var extra = data.object;

    var actor = data.actor;
    if (extra.data.name.includes("Condition") || extra.data.name.includes("condition")){
        var cba = document.querySelectorAll(`input[data-id="${extra.data.name}"]:checked`); // Checked boxes
        var cbb = document.querySelectorAll(`input[data-id="${extra.data.name}"]`) // Unchecked boxes
        var boxString = "";
        for (let i = 0; i < cba.length; i++){
            boxString+=`<input type="checkbox" data-id="${extra.data.name}" checked></input>`
        }
        for (let i = 0; i < (cbb.length - cba.length); i++){
            boxString+=`<input type="checkbox" data-id="${extra.data.name}"></input>`
        }
        await actor.updateEmbeddedEntity("OwnedItem", {
            _id:extra._id,
            "data.description.value":`${boxString}`
        });
    }
})