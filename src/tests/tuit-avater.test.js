
import { getByTestId, render } from "@testing-library/react";
import TuitAvater from "../components/home/tuitAvater";

const url = "https://firebasestorage.googleapis.com/v0/b/image-d9eae.appspot.com/o/images%2Fpussy.jpeg?alt=media&token=575a12ad-0f1a-4389-98cb-7e5f92b3db99";

const mockData = {
    avater: url
}
describe("renders an image", () => {
    it("renders an image", () => {
        const tuitAvater = render(<TuitAvater profile = {mockData} />);
        
        expect(tuitAvater.getByTestId('avater')).toHaveStyle(`background-image: url(${url})`)
     });
 });