import React, { useCallback, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AutoSizer } from "react-virtualized/dist/commonjs/AutoSizer";
import { List } from "react-virtualized/dist/commonjs/List";
import { CellMeasurer } from "react-virtualized/dist/commonjs/CellMeasurer";
import { useMeasureCache } from "./hooks/hooks";
import { getPluginClass } from "../utils/plugin";
import "./plugins/index";

export default function MessageList({ messages, friend }) {
    const listRef = useRef(null);
    const timer = useRef(null);
    const cache = useMeasureCache(messages.length, friend);

    const renderItem = useCallback(
        ({ index, key, parent, style }) => (
            <CellMeasurer
                cache={cache}
                columnIndex={0}
                key={key}
                parent={parent}
                rowIndex={index}
            >
                {({ measure }) => {
                    const message = messages[index];
                    const MessageClass = getPluginClass(message.type);
                    return (
                        <MessageClass
                            style={style}
                            key={key}
                            measure={measure}
                            message={message}
                            messageFrom={message.from}
                        />
                    );
                }}
            </CellMeasurer>
        ),
        [cache, messages]
    );

    //scrollToRow on List with dynamic heights and
    //CellMeasurer doesn't always scroll to the proper location
    //or use setTimeout
    useEffect(() => {
        const refNode = listRef.current;
        refNode.scrollToRow(messages.length - 1);

        timer.current = requestAnimationFrame(() => {
            refNode.scrollToRow(messages.length - 1);
        });

        return () => cancelAnimationFrame(timer.current);
    }, [messages.length]);

    return (
        <div className="message-list">
            <AutoSizer>
                {({ width, height }) => (
                    <List
                        className="message-box"
                        ref={listRef}
                        width={width}
                        height={height}
                        overscanRowCount={12}
                        rowCount={messages.length}
                        rowRenderer={renderItem}
                        deferredMeasurementCache={cache}
                        rowHeight={cache.rowHeight}
                    />
                )}
            </AutoSizer>
        </div>
    );
}

MessageList.propTypes = {
    messages: PropTypes.array,
    friend: PropTypes.string
};
