// let result = {};
let fs = require('fs');
let file = JSON.parse(fs.readFileSync('parser/source.gliffy', 'utf8'));

const striptags = require('striptags');
const resultStr = "round_rectangle";
const questionStr = "ellipse";
const lineStr = "control_flow";
const startStr = "message";
const styleRegEx = new RegExp('style=\\"((?!\").)*\"', 'g');
// style=\\"((?!\").)*\" - style attr regecp

let result = {
    items: {}
};

for (let item of file.stage.objects) {
    switch (getType(item)) {
        case 'result' :
            addResult(item);
            break;
        case 'question' :
            addQuestion(item);
            break;
        case 'start':
            addStart(item);
            break;
    }
}

for (let item of file.stage.objects) {
    if ('line' === getType(item)) {
        addAnsver(item);
    }
}

fs.writeFile('questScript.json', JSON.stringify(result), 'utf8');


function addStart(item){
    result.startQuest = item.constraints.endConstraint.EndPositionConstraint.nodeId;
}

function addAnsver(ansver) {
    let sartID;
    let endID;

    if(ansver.constraints){
        sartID = ansver.constraints.startConstraint.StartPositionConstraint.nodeId;
        endID = ansver.constraints.endConstraint ? ansver.constraints.endConstraint.EndPositionConstraint.nodeId : null;
    }else{
        return false;
    }

    if (ansver.children && ansver.children.length) {
        let finalAnsver = {
            "text": formatText(ansver.children[0].graphic.Text.html),
            "next": endID
        };

        result.items[sartID].answers.push(finalAnsver);
    } else {
        result.items[sartID].next = endID;
    }
}

function addResult(item) {
    let id = item.id;
    let finalResult = {
        "id":id,
        "type": "result",
        "text": formatText(item.children[0].graphic.Text.html),
        "next": null
    };
    // console.log(finalResult);
    result.items[id] = finalResult;
}

function addQuestion(item) {
    let id = item.id;
    let finalQestion = {
        "id":id,
        "text": formatText(item.children[0].graphic.Text.html),
        "type": "question",
        "answers":[]
    };
    result.items[id] = finalQestion;
}

function getType(item) {
    if (item.uid.indexOf(resultStr) !== -1) {
        return 'result'
    }
    if (item.uid.indexOf(questionStr) !== -1) {
        return 'question'
    }
    if (item.uid.indexOf(lineStr) !== -1) {
        return 'line'
    }
    if (item.uid.indexOf(startStr) !== -1) {
        return 'start'
    }
}


function formatText(str){
    console.log('_______________');
    console.log(str);
    console.log(str.replace(styleRegEx, ''));
    console.log('_______________');
    return str.replace(styleRegEx, '');
}
