import { getMenuList } from "./JSXUtils";

export function objectToQueryString(obj, prefix = '') {
	const queryStringParts = [];
	for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
					const value = obj[key];
					const prefixedKey = prefix ? `${prefix}[${key}]` : key;
					if (Array.isArray(value)) {
						// Handle arrays by appending each item as prefixedKey[]
						value.forEach(item => {
								queryStringParts.push(`${encodeURIComponent(prefixedKey)}[]=${encodeURIComponent(item)}`);
						});
					}
					else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
							// Recursively call for nested objects
							queryStringParts.push(objectToQueryString(value, prefixedKey));
					} else {
							// Encode key-value pair
							queryStringParts.push(`${encodeURIComponent(prefixedKey)}=${encodeURIComponent(value)}`);
					}
			}
	}
	return queryStringParts.join('&');
}

export function urlSearchParamsToObject(queryParams) {
  const obj = {};
  queryParams.forEach((value, key) => {
    const keys = key.split(/[\[\]]+/).filter(Boolean); // Split and filter empty strings
    
    let current = obj;
    keys.forEach((k, i) => {
      if (i === keys.length - 1) { // Last key in the hierarchy
        if (key.endsWith('[]')) { // Check if key is an array type
          if (!current[k]) {
            current[k] = []; // Initialize as array
          }
          current[k].push(value);
        } else {
          if (current[k]) {
            if (!Array.isArray(current[k])) {
              current[k] = [current[k]]; // Convert existing value to array
            }
            current[k].push(value);
          } else {
            current[k] = value; // Single value assignment
          }
        }
      } else {
        // Initialize nested objects or arrays if they don't exist
        if (!current[k]) {
          current[k] = isNaN(keys[i + 1]) ? {} : [];
        }
        current = current[k];
      }
    });
  });
  return obj;
}
export function debounce(func, delay) {
	let timeoutId;
	return (...args) => {
		if (timeoutId) {
				clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
				func.apply(null, args);
		}, delay);
	};
}

export const getId = () => {
  if (localStorage.getItem("role") === "vendor-user") {
    return localStorage.getItem("vendor-userId");
  } else if (localStorage.getItem("role") === "venue-user") {
    return localStorage.getItem("venue-userId");
  } else if (localStorage.getItem("role") === "user") {
    return localStorage.getItem("userId");
  }
  return "";
}

export const getRole = () => {
  if (localStorage.getItem("role") === "vendor-user") {
    return "vendor";
  } else if (localStorage.getItem("role") === "venue-user") {
    return "venue";
  } else if (localStorage.getItem("role") === "user") {
    return "user";
  }
  return "";
}

export const isLoggedInUser = () =>{
  const keys = ['adminId', 'vendor-userId', 'venue-userId', "userId"];
    for (const key of keys) {
      const value = localStorage.getItem(key);
      if (value !== null) {
        return true;
      }
    }
    return false;
}

export const getUserId = () =>{
  const keys = ['adminId', 'vendor-userId', 'venue-userId', "userId"];
    for (const key of keys) {
      const value = localStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    }
    return null;
}

export function convertUnixToDate(unixTime) {
  const date = new Date(unixTime * 1000); // Convert Unix time to milliseconds
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options); // Adjust locale as needed
}

export function convertISOToDateFormat(isoString) {
  const date = new Date(isoString); 
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export const getHeader = () =>{
  const keys = [{name : 'adminId', key : 'adminId'},
              {name : 'vendor-userId', key : 'vendor_id'},
              {name : 'venue-userId', key : 'venue_id'},
              {name : 'userId', key : 'user_id'},
              ];
  for (const key of keys) {
    const value = localStorage.getItem(key.name);
    if (value !== null) {
      return {[key.key] : value};
    }
  }
  return false;
}

export const isVendorLoggedIn = () => {
  if (localStorage.getItem("vendor-userId") !== null) {
    return true;
  }
}

export const isVenueLoggedIn = () => {
  if (localStorage.getItem("venue-userId") !== null) {
    return true;
  }
}

export const isAdminLoggedIn = () => {
  if (localStorage.getItem("adminId") !== null) {
    return true;
  }
}

export const isUserLoggedIn = () => {
  if (localStorage.getItem("userId") !== null) {
    return true;
  }
}

export const getClassOfStatus = (state) => {
  switch (state) {
    case "Pending":
      return "bg-yellow-4 text-yellow-3";
    case "In Progress":
      return "bg-info-2 text-dark-1";
    case "Confirmed":
      return "bg-green-1 text-green-2";
    case "Approved":
      return "bg-green-1 text-green-2";
    case "Cancelled":
      return "bg-blue-1-05 text-red-1";
    case "Rejected":
      return "bg-blue-1-05 text-red-1";
    default:
    break;
  }
}

export const getSeoFriendlyURL = (name) => {
  const seoFriendly = name
  .toLowerCase() // Convert to lowercase
  .replace(/,/g, '') // Remove commas
  .replace(/\s+/g, '-');
  return seoFriendly;
}

export const getIDFromURL = (input) => {
  const match = input.match(/(\d+)$/); // Regular expression to match digits at the end
  const number = match ? parseInt(match[0], 10) : null; 
  return number;
}

export const getImageName = (file) => {
  if (!file || !file.type) return "unknown_file"; // Handle missing file
  
  const now = new Date();
  const formattedDate = now.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).replace(/\//g, "-").replace(/, /g, "-").replace(/:/g, "-");

  const fileExtension = file.type.split("/")[1] || "jpg"; // Extract extension, default to 'jpg'
  const uniqueId = Math.random().toString(36).substring(2, 10); // Random string
  
  return `featured_blog_img_${formattedDate}_${uniqueId}.${fileExtension}`;
};

export const createSlug = (title) => {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-"); // Remove multiple hyphens
};

// export function formatDate(isoString) {
//   const date = new Date(isoString);

//   // Extract the YYYY-MM-DD part
//   const formattedDate = date.toISOString().split("T")[0];

//   return formattedDate;
// }

export function formatDate(utcDate) {
  const date = new Date(utcDate);
  
  // Convert to local timezone and extract YYYY-MM-DD
  return date.toLocaleDateString("en-CA"); // "en-CA" ensures YYYY-MM-DD format
}