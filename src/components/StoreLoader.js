
import axios from "axios";

export default async function StoreLoader(projectId, loginToken) {
  let result = {};
  let all = [];
  // let allGroup = await loadUngroup(projectId).then(allGroup => {
  //   //console.log("allGroup = ", allGroup);
  //   return allGroup;
  // });
  // all.push(allGroup);
  // await response of fetch call
  let responseGroups = await fetch(
    "https://store.xsolla.com/api/v1/project/" + projectId + "/items/groups",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + loginToken
      }
    }
  );
  //console.log("responseGroups = ", responseGroups);
  if (responseGroups) {
    // only proceed once promise is resolved
    let resolvedGroups = await responseGroups.json();
    resolvedGroups = resolvedGroups["groups"];
    // only proceed once second promise is resolved

    let fulfilledGroups = await Promise.all(
      resolvedGroups.map((oneGroup, key) => {
        //console.log("group", oneGroup);
        return loadByGroup(projectId, oneGroup);
      })
    ).then(fulfilledGroups => {
      //console.log("fulfilledGroups = ", fulfilledGroups);
      return fulfilledGroups;
    });
    all = all.concat(fulfilledGroups);
  }

  //console.log("result = ", all);

  result = {
    virtualItems: all
  };
  return result;
}

function loadByGroup(projectId, group) {
  return new Promise((resolve, reject) => {
    fetch(
      "https://store.xsolla.com/api/v1/project/" +
        projectId +
        "/items/virtual_items/group/" +
        group["external_id"]
    )
      .then(response => response.json())
      .then(json => {
        let products = json["items"];
        group["products"] = products;
        resolve(group);
      })
      .catch(function(error) {
        console.log("Products ERROR = ", error.message);
        reject(error.message);
      });
  });
}

function loadUngroup(projectId) {
  return new Promise((resolve, reject) => {
    fetch(
      "https://store.xsolla.com/api/v1/project/" +
        projectId +
        "/items/virtual_items"
    )
      .then(response => response.json())
      .then(json => {
        let products = json["items"];
        let group = {
          id: 0,
          external_id: "0_all",
          description: "all",
          name: "all"
        };
        group["products"] = products;
        //console.log("all = ", group);
        resolve(group);
      })
      .catch(function(error) {
        console.log("Products ERROR = ", error.message);
        reject(error.message);
      });
  });
}

export function changeItemQuantityCart({sku = 'sku'}, quantity, cartId, loginToken) {
    //console.log("sku added = ", sku, " to cartId = ", cartId);
    let opts = {
        url:
            "https://store.xsolla.com/api/v1/project/" +
            window.xProjectId +
            "/cart/" +
            cartId +
            "/item/" +
            sku,
        method: "PUT",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "Bearer " + loginToken
        },
        data: JSON.stringify({
            quantity: quantity
        })
    };
    axios(opts)
        .then(function(response) {
            //console.log("Item added = ", response.data);
            let resp = response.data;
        })
        .catch(function(error) {
            console.log("L2PS ERROR = ", error.response);
        });
}

export function createCart (loginToken) {
    let opts = {
        url:
            "https://store.xsolla.com/api/v1/project/" +
            window.xProjectId +
            "/cart",
        method: "POST",
        headers: {
            Authorization: "Bearer " + loginToken
        }
    };
    return axios(opts)
        .then(function(response) {
            //console.log('createCart ', response.data["id"]);
            return response;
        })
        .catch(function(error) {
            console.log("L2PS ERROR = ", error.response);
        });
}

export function removeItemFromCart ({sku = 'sku'}, cartId, loginToken) {
    //console.log("sku removed = ", sku, " from cartId = ", cartId);
    let opts = {
        url:
            "https://store.xsolla.com/api/v1/project/" +
            window.xProjectId +
            "/cart/" +
            cartId +
            "/item/" +
            sku,
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + loginToken
        }
    };
    axios(opts)
        .then(function(response) {
            //console.log("Item removed = ", response.data);
            let resp = response.data;
        })
        .catch(function(error) {
            console.log("L2PS ERROR = ", error.response);
        });
}

export function getPsTokenBuyCart(cartId, loginToken) {
    let opts = {
        url:
            "https://store.xsolla.com/api/v1/project/" +
            window.xProjectId +
            "/payment/cart/" +
            cartId,
        method: "POST",
        headers: {
            Authorization: "Bearer " + loginToken
        }
    };
    return axios(opts)
        .then(function(response) {
            //console.log("PsToken generated = ", response.data);
            return response;
        })
        .catch(function(error) {
            console.log("L2PS ERROR = ", error.response);
        });
}
