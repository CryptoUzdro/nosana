// Process all lines (JSON objects) received in this message.
            for (var i = 0; i < arr.length; i++) {
                if (debugLog) {
                    console.log("[%d] %s:%d - recv %s",
                                conn.sessionId,
                                localsocket.remoteAddress,
                                localsocket.remotePort,
                                arr[i]
                               );
                }
                
                var jd = JSON.parse(arr[i])
                if (jd && jd.method && jd.method == "mining.subscribe") {
                    conn.nhMode = true;
                    console.log("[%d] Received mining.subscribe, sending initial mining.notify", conn.sessionId);
                    conn.writeObj({ "id": jd.id,
                                    "result": [
                                        [
                                            "mining.notify",
                                            d2h(conn.sessionId, 16),
                                            "EthereumStratum/1.0.0"
                                        ],
                                        d2h(conn.extraNonce, 6)
                                    ],
                                    "error": null
                                  });
                } else if (jd && jd.method && jd.method == "mining.extranonce.subscribe") {
                    console.log("[%d] Received mining.extranonce.subscribe", conn.sessionId);
                    conn.writeObj({ "id": jd.id,
                                    "result": true,
                                    "error": null
                                  });
