const checkAndParseResponse = (res, message) => {
  if (!res.ok) {
    throw new Error(message + res.statusText);
  }
  return res.json();
};

export const getAllCustomers = () => {
  const response = fetch(`${import.meta.env.VITE_API_URL}/customers`).then(
    (res) => checkAndParseResponse(res, "Error in fetching customers: ")
  );
  return response;
};

export const getCustomer = (url) => {
  const response = fetch(url).then((res) =>
    checkAndParseResponse(res, "Error in fetching customer's details: ")
  );
  return response;
};

export const addCustomer = (customer) => {
  const response = fetch(`${import.meta.env.VITE_API_URL}/customers`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(customer),
  }).then((res) => checkAndParseResponse(res));

  return response;
};

export const deleteCustomer = (url) => {
  const response = fetch(url, { method: "DELETE" }).then((res) => {
    checkAndParseResponse(res, "Error in deleting customer: ");
  });

  return response;
};

export const editCustomer = (url, customer) => {
  const response = fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((res) => checkAndParseResponse(res));

  return response;
};

export const getTrainings = () => {
  const response = fetch(`${import.meta.env.VITE_API_URL}/gettrainings`).then(
    (res) => checkAndParseResponse(res, "Error in fetching trainings: ")
  );
  return response;
};

export const addTraining = (traing) => {
  const response = fetch(`${import.meta.env.VITE_API_URL}/trainings`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(traing),
  }).then((res) => checkAndParseResponse(res, "Error in creating training: "));
  return response;
};

export const deleteTraining = (id) => {
  const response = fetch(`${import.meta.env.VITE_API_URL}/trainings/${id}`, { method: "DELETE" }).then((res) => {
    checkAndParseResponse(res, "Error in deleting training: ");
  });

  return response;
};
