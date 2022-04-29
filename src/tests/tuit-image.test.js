import { getByTestId, render } from "@testing-library/react";
import TuitImage from "../components/tuits/tuit-imageMock";

const url = "https://firebasestorage.googleapis.com/v0/b/image-d9eae.appspot.com/o/images%2Fimages.jpeg?alt=media&token=a19f4a3f-ea9c-4e9f-b4f8-1666d09ddde3";

const mockData = {
    image: [url]
}
describe("renders an image", () => {
    it("renders an image", () => {
        const tuitImage = render(<TuitImage tuit = {mockData} />);

        expect(tuitImage.getByTestId('background')).toHaveStyle(`background-image: url(${url})`)
     });
 });

