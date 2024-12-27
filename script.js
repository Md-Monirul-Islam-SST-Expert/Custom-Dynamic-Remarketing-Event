// For loop practice

// To know the total number of item of an array, we need to use arrayName.length


// firstItem.id This will work too. 
// But if key is like 'your name' or key is dynamic then this method will work best: firstItem['id']
// var firstItemId = firstItem['id']; 

// Add item_id parameter into the first item of the array
// firstItem.item_id = 'abcd';


// Adding a new item_id parameter into an array
// for (i = 0; i < items.length; i++) {

//     var eachItem = items[i];
//     var itemId = eachItem.id;
//     var variantId = eachItem.variant_id;
//     var countryCode = eachItem.item_brand;

//     items[i].item_id = 'shopify_' + countryCode + '_' + itemId + '_' + variantId;
// }
// console.log('Items', items);



//creating dynamic remarketing array 
// var dynamicRemarketing = [];
// for ( i = 0; i < items.length; i++) {

//     var item = items[i];
//     var remarketingId = item.item_id;
//     var dynamicItems = {
//         id : remarketingId,
//         google_business_vertical: 'retail'
//     };
    
//     dynamicRemarketing.push(dynamicItems);
// }
// console.log('Dynamic Remarketing', dynamicRemarketing);

var items = [
    {
        id: '101',
        variant_id: 'BD2022',
        item_name: "CT Scan",
        item_brand: 'DE',
        item_category: 'Scanner',
        price: 1500  
    },
    {
        id: '102',
        variant_id: 'IN2024',
        item_name: "X-ray",
        item_brand: 'US',
        item_category: 'Imaging',
        price: 2000  
    },
    {
        id: '103',
        variant_id: 'PK2026',
        item_name: "Ultrasound",
        item_brand: 'UK',
        item_category: 'Rediology',
        price: 2200 
    }
]

// view_item_list dataLayer event
var eventButton = document.getElementById("view-item-list-btn");
if (eventButton) {
    eventButton.addEventListener("click", function() {
        
        for ( var i = 0; i < items.length; i++ ){
            var itemsObject = items[i]; 
            var itemId = itemsObject.id;
            var variantId = itemsObject.variant_id;
            var countryCode = itemsObject.item_brand;

            itemsObject.item_id = 'shopify_' + countryCode + '_' + itemId + '_' + variantId;
        }

        // Sum of all item prices from items array
        var totalValue = items.reduce( function(accumulator, currentValue){
            return accumulator + (currentValue.price || 0);
        },0)

        // push view_item_list event into datalayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push ({
            event: "view_item_list",
            ecommerce: {
                value: totalValue,
                currency: "USD",
                items: items
            }
        });
        console.log("Ecommerce Event:", window.dataLayer);


        // push dynamic_remarketing dataLayer event 
        for ( var i = 0; i < window.dataLayer.length; i++ ){
            var findDatalayer =  window.dataLayer[i];

            if (findDatalayer.event === "view_item_list" && findDatalayer.ecommerce) {
                // creating dynamic remarketing items array
                var dynamicRemarketingArray = [];
                
                for ( var i = 0; i < items.length; i++ ) {
                    var remarketingItems = items[i];
                    var remarketingId = remarketingItems.item_id;
                    var remarketingItems = {
                        id : remarketingId,
                        google_business_vertical: 'retail'
                    }
                    dynamicRemarketingArray.push(remarketingItems);
                }

                // push dynamic_remarketing dataLayer event 
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: "dynamic_remarketing",
                    items: dynamicRemarketingArray
                });
            }
        }
    });
}


// view_cart dataLayer event
var eventButton = document.getElementById("view-cart-btn");
if (eventButton) {
    eventButton.addEventListener("click", function() {

        for ( var i = 0; i < items.length; i++ ){
            var itemsObject = items[i];
            var itemId = itemsObject.id;
            var variantId = itemsObject.variant_id;
            var countryCode = itemsObject.item_brand;

            itemsObject.item_id = 'shopify_' + countryCode + '_' + itemId + '_' + variantId;
        }
    
        var totalValue = items.reduce( function(accumulator, currentValue){
            return accumulator + (currentValue.price || 0);
        },0)
    
        // push view_cart event into datalayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push ({
            event: "view_cart",
            ecommerce: {
                value: totalValue,
                currency: "USD",
                items: items
            }
        });
        console.log("Ecommerce Event:", window.dataLayer);
    });
}







