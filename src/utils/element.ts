const _getElementsByElemID = <GenericElementType extends Element>(
	elemID: string,
	allowMany = false
) => {
	const dataAttribute = "data-elem-id";
	const elems = document.querySelectorAll<GenericElementType>(
		`[${dataAttribute}=${elemID}]`
	);

	if (!elems) return null;
	if (allowMany && elems?.length > 1) return Array.from(elems);
	return elems[0];
};

export const getElementByElemID = <GenericElementType extends Element>(
	elemID: string
) => {
	const results = _getElementsByElemID<GenericElementType>(elemID);
	if (!results || Array.isArray(results)) return null;
	return results;
};

export const getElementsByElemID = <GenericElementType extends Element>(
	elemID: string
) => {
	const results = _getElementsByElemID<GenericElementType>(elemID, true);
	if (!results || !Array.isArray(results)) return null;
	return results;
};
