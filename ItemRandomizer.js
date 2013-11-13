#pragma strict
var items:Transform[];
var spawnLocObjectName:String;
var totalSpawnPoints:int;
private var spawnPoints:Transform[];
private var spawnPointsUsed:Transform[];
private var added:int;
private var points:int = 0;

function Start () {
	spawnPointsUsed = new Transform[0];
	spawnPoints = new Transform[totalSpawnPoints];
	var objects:GameObject[] = FindObjectsOfType(GameObject);
	
	for (var obj:GameObject in objects) {
    	if (obj.name.Contains(spawnLocObjectName)) {
    		spawnPoints[added] = obj.transform;
    		added++;
    	}
	}
	RandomizeAll();
}


function RandomizeAll() {
	for (var item:Transform in items) {
		RandomizeItem(item);
	}
}

function RandomizeItem(item:Transform) {
	Debug.Log("Spawning item... " + points);
	var pos:Transform = spawnPoints[Random.Range(0, spawnPoints.length)];
	Debug.Log("Pos: " + pos.position + "  Item: " + item.name);
	
	
	Debug.Log(points);
	if (spawnPointsUsed.Length > 0) {
		for (var i:int = 0; i < spawnPointsUsed.Length; i++) {
			Debug.Log("INDEX: " + i);
			if (pos.position == spawnPointsUsed[i].position) {
				Debug.Log("RESPAWNING!");
				RandomizeItem(item);
				return;
			}
		}
	}
	item.transform.position = pos.position;
	points++;
	var tempArray = spawnPointsUsed;
	spawnPointsUsed = new Transform[spawnPointsUsed.Length + 1];
	for(var s:int = 0; s < tempArray.length; s++){
 		spawnPointsUsed[s] = tempArray[s];
 	}
	spawnPointsUsed[tempArray.length] = pos;
}
