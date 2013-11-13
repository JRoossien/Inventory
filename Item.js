

var itemIcon : Texture2D;
var itemType : String;
var stackable = false;
var maxStack = 20;
var amount = 1;
var canEquip = true;
var canDrop = false;
var canHold = false;
var canGet = true;
var heldItemOffset:Vector3 = Vector3(0,0,0);
var holdItemVersion : Transform;
static var inv : Inventory;
var player:Transform;

@script AddComponentMenu ("Inventory/Items/Item")

function Awake () {
	inv = FindObjectOfType(Inventory);
	if (inv == null) {
		canGet = false;
		Debug.LogWarning("No inventory found!");
	} else {
		gameObject.SendMessage("RetrievePlayer", inv, SendMessageOptions.DontRequireReceiver);
	}
	
	if (canEquip == false && GetComponent(ItemAction) == null) {
		Debug.LogError(gameObject.name + " is missing the script ItemAction");
	}
	
	if (player == null) {
		Debug.LogError("No player assigned.");
	}
}


function OnMouseDown() {
	//Pickup();
}


function Pickup() {
	var getItem = true;
	if (canGet) {
		if (stackable) {
			var item:Item;
			for (var t:Transform in inv.items) {
				if(t.name == this.transform.name) {
					var i:Item = t.GetComponent(Item);
					if (i.amount < i.maxStack) {
						item = i;
					}
				}
			}
			
			if(item != null) {
				getItem = false;
				item.amount += 1;
				Destroy(this.gameObject);
			} else {
				getItem = true;
			}
		}
		
		if (getItem && inv.items.length < inv.maxItems) {
			inv.AddItem(this.transform);
			MoveToPlayer(inv.itemHolder);
		} else if (inv.items.length >= inv.maxItems) {
			Debug.Log("Inventory is full");
		}
	}
}


function MoveToPlayer(itemHolder:Transform) {
	canGet = false;
	
	if (GetComponent(MeshRenderer) != null) {
		GetComponent(MeshRenderer).enabled = false;
	}
	
	if (GetComponent(Collider) != null) {
		GetComponent(Collider).enabled = false;
	}
	
	GetComponent("Item").enabled = false;
	GetComponent("ItemPickup").enabled = false;
	
	transform.parent = itemHolder;
	transform.localPosition = heldItemOffset;
}


function Drop(duplicate:boolean) {
	gameObject.transform.position.x = player.transform.position.x;
	gameObject.transform.position.y = player.transform.position.y + -0.7;
	gameObject.transform.position.z = player.transform.position.z;
	//gameObject.rigidbody.AddForce(transform.forward * 30f, ForceMode.Impulse);
	//gameObject.rigidbody.AddForce(transform.up * 40f, ForceMode.Impulse);
	
	if (duplicate == false) {
		
		canGet = true;
		gameObject.SetActive(true);
		
		if (GetComponent(MeshRenderer) != null) {
			//GetComponent(MeshRenderer).enabled = true;
		}
		
		if (GetComponent(Collider) != null) {
			//GetComponent(Collider).enabled = true;
		}
	
		GetComponent("Item").enabled = true;
		GetComponent("ItemPickup").enabled = true;
		
		transform.parent = null;
		//DelayPhysics();
	} else {
		canGet = true;
		var clone = Instantiate(gameObject, transform.position, transform.rotation);
		canGet = false;
		clone.SetActive(true);
		
		if (clone.GetComponent(MeshRenderer) != null) {
			//clone.GetComponent(MeshRenderer).enabled = true;
		}
		
		if (clone.GetComponent(Collider) != null) {
			//clone.GetComponent(Collider).enabled = true;
		}
	
		clone.GetComponent("Item").enabled = true;
		GetComponent("ItemPickup").enabled = true;
		
		clone.transform.parent = null;
		clone.name = gameObject.name;
	}
}


function DelayPhysics () {
	if (inv.transform.parent.collider != null && collider != null) {
		//Physics.IgnoreCollision(inv.transform.parent.collider, collider, true);
		//yield WaitForSeconds (1);
		//Physics.IgnoreCollision(inv.transform.parent.collider, collider, false);
	}
}