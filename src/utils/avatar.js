export const getAvatarUrl = (name) => {
	const encodedName = encodeURIComponent(name || "User");
	return `https://ui-avatars.com/api/?name=${encodedName}&background=E46D47&color=fff&bold=true`;
};
