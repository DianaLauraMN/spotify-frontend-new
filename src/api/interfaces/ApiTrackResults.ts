import Track from "../../entities/track/Track";

export interface TrackResults {
    assert?: Track;
    failed?: Track;
    score: number;
}