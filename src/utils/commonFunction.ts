const hasToken = (router: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    router.push("/profile");
  }
};

const hasNoToken = (router: any) => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/signin");
  }
};

export { hasToken, hasNoToken };
