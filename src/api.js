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
    checkAndParseResponse(res, "Error in fetching a customer: ")
  );
  return response;
};

export const getAllTrainings = () => {
  const response = fetch(`${import.meta.env.VITE_API_URL}/trainings`).then(
    (res) => checkAndParseResponse(res, "Error in fetching trainings: ")
  );
  return response;
};
