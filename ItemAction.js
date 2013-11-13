#pragma strict
var deleteOnUse = true;
private var inv:Inventory;
private var item:Item;

@script AddComponentMenu ("Inventory/Items/Item Effect")
@script RequireComponent(Item)

function Awake () {
	inv = FindObjectOfType(Inventory);
	item = GetComponent(Item);
}

function UseAction() {
	
	
	if (deleteOnUse == true) {
		DeleteUsedItem();
	}
}

function DeleteUsedItem() {
	if (item.amount == 1) {
		inv.RemoveItem(this.gameObject.transform);
	} else {
		item.amount -= 1;
	}
	Debug.Log(item.name + " has been deleted on use");
}