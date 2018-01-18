export default (n) => {
    const data = {
        position: [],
        elements: []
    };
    for (let i = -n, j = 0; i <= n; i++, j+= 4) {
        data.position.push([i, -n], [i, n], [-n, i], [n, i]);
        data.elements.push([j, j + 1], [j + 2, j + 3]);
    }
    return data;;
};
