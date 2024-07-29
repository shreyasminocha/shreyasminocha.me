import { visit, SKIP } from "unist-util-visit";

export default function retextInlineParagraph() {
    return (tree, file) => {
        visit(
            tree,
            (node, index, parent) =>
                node.type === "element" &&
                node.tagName === "p" &&
                index === 0 &&
                parent.type === "root",
            (node, index, parent) => {
                parent.children.splice(index, 1, ...node.children);
                // Do not traverse `node`, continue at the node *now* at `index`.
                return [SKIP, index];
            },
        );
    };
}
