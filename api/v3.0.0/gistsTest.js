/*
 * Copyright 2012 Cloud9 IDE, Inc.
 *
 * This product includes software developed by
 * Cloud9 IDE, Inc (http://c9.io).
 *
 * Author: Mike de Boer <mike@c9.io>
 */

"use strict";

var Assert = require("assert");
var Client = require("./../../index");

describe("[gists]", function() {
    var client;
    var token = "e5a4a27487c26e571892846366de023349321a73";
    timeout(5000);

    beforeEach(function() {
        client = new Client({
            version: "3.0.0"
        });
        client.authenticate({
            type: "oauth",
            token: token
        });
    });

    it("should successfully execute GET /gists (getAll)",  function(next) {
        client.gists.getAll(
            {},
            function(err, res) {
                Assert.equal(err, null);
                Assert.equal(res.length, 1);
                var gist = res.pop();
                Assert.equal(gist.user.login, "mikedeboertest");
                Assert.equal(gist.html_url, "https://gist.github.com/77dc15615eab09a79b61");
                Assert.equal(gist.created_at, "2012-10-05T16:10:40Z");
                Assert.equal(gist.public, false);
                Assert.equal(gist.id, "77dc15615eab09a79b61");

                next();
            }
        );
    });

    it("should successfully execute GET /users/:user/gists (getFromUser)",  function(next) {
        client.gists.getFromUser(
            {
                user: "mikedeboertest"
            },
            function(err, res) {
                Assert.equal(err, null);
                Assert.equal(res.length, 1);
                var gist = res.pop();
                Assert.equal(gist.user.login, "mikedeboertest");
                Assert.equal(gist.html_url, "https://gist.github.com/77dc15615eab09a79b61");
                Assert.equal(gist.created_at, "2012-10-05T16:10:40Z");
                Assert.equal(gist.public, false);
                Assert.equal(gist.id, "77dc15615eab09a79b61");
                next();
            }
        );
    });

    it("should successfully execute POST /gists (create)",  function(next) {
        client.gists.create(
            {
                description: "Another bowl of pasta",
                public: "false",
                files: {
                    "ravioli.js": {
                        "content": "alert(\"want some ketchup with that?\");"
                    }
                }
            },
            function(err, res) {
                Assert.equal(err, null);
                var id = res.id;

                client.gists.get(
                    {
                        id: id
                    },
                    function(err, res) {
                        Assert.equal(err, null);
                        Assert.equal(res.user.login, "mikedeboertest");
                        Assert.equal(res.html_url, "https://gist.github.com/" + id);
                        Assert.equal(res.public, false);
                        Assert.equal(res.id, id);
                        Assert.equal(res.description, "Another bowl of pasta");

                        client.gists["delete"](
                            {
                                id: id
                            },
                            function(err, res) {
                                Assert.equal(err, null);
                                next();
                            }
                        );
                    }
                );
            }
        );
    });

    it("should successfully execute PATCH /gists/:id (edit)",  function(next) {
        client.gists.create(
            {
                description: "Another bowl of pasta",
                public: "false",
                files: {
                    "ravioli.js": {
                        "content": "alert(\"want some ketchup with that?\");"
                    }
                }
            },
            function(err, res) {
                Assert.equal(err, null);
                var id = res.id;

                client.gists.edit(
                    {
                        id: id,
                        description: "changed",
                        files: {
                            "ravioli.js": {
                                "content": "alert(\"no ketchup, please.\");"
                            }
                        }
                    },
                    function(err, res) {
                        Assert.equal(err, null);

                        client.gists.get(
                            {
                                id: id
                            },
                            function(err, res) {
                                Assert.equal(err, null);
                                Assert.equal(res.user.login, "mikedeboertest");
                                Assert.equal(res.html_url, "https://gist.github.com/" + id);
                                Assert.equal(res.public, false);
                                Assert.equal(res.id, id);
                                Assert.equal(res.description, "changed");
                                Assert.equal(res.files["ravioli.js"].content, "alert(\"no ketchup, please.\");");

                                client.gists["delete"](
                                    {
                                        id: id
                                    },
                                    function(err, res) {
                                        Assert.equal(err, null);
                                        next();
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    });
/*
    it("should successfully execute GET /gists/public (public)",  function(next) {
        client.gists.public(
            {},
            function(err, res) {
                Assert.equal(err, null);
                console.log(res);
                next();
            }
        );
    });
*/
    it("should successfully execute GET /gists/starred (starred)",  function(next) {
        client.gists.starred(
            {},
            function(err, res) {
                Assert.equal(err, null);
                Assert.equal(res.length, 1);
                var gist = res.pop();
                Assert.equal(gist.user.login, "mikedeboertest");
                Assert.equal(gist.html_url, "https://gist.github.com/77dc15615eab09a79b61");
                Assert.equal(gist.created_at, "2012-10-05T16:10:40Z");
                Assert.equal(gist.public, false);
                Assert.equal(gist.id, "77dc15615eab09a79b61");

                next();
            }
        );
    });

    it("should successfully execute GET /gists/:id (get)",  function(next) {
        client.gists.create(
            {
                description: "Another bowl of pasta",
                public: "false",
                files: {
                    "ravioli.js": {
                        "content": "alert(\"want some ketchup with that?\");"
                    }
                }
            },
            function(err, res) {
                Assert.equal(err, null);
                var id = res.id;

                client.gists.get(
                    {
                        id: id
                    },
                    function(err, res) {
                        Assert.equal(err, null);
                        Assert.equal(res.user.login, "mikedeboertest");
                        Assert.equal(res.html_url, "https://gist.github.com/" + id);
                        Assert.equal(res.public, false);
                        Assert.equal(res.id, id);
                        Assert.equal(res.description, "Another bowl of pasta");

                        client.gists["delete"](
                            {
                                id: id
                            },
                            function(err, res) {
                                Assert.equal(err, null);
                                next();
                            }
                        );
                    }
                );
            }
        );
    });

    it("should successfully execute PUT /gists/:id/star (star)",  function(next) {
        client.gists.create(
            {
                description: "Another bowl of pasta",
                public: "false",
                files: {
                    "ravioli.js": {
                        "content": "alert(\"want some ketchup with that?\");"
                    }
                }
            },
            function(err, res) {
                Assert.equal(err, null);
                var id = res.id;

                client.gists.star(
                    {
                        id: id
                    },
                    function(err, res) {
                        Assert.equal(err, null);

                        client.gists.checkStar(
                            {
                                id: id
                            },
                            function(err, res) {
                                Assert.equal(err, null);
                                //TODO: NO RESULT HERE???

                                client.gists["delete"](
                                    {
                                        id: id
                                    },
                                    function(err, res) {
                                        Assert.equal(err, null);
                                        next();
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    });

    it("should successfully execute DELETE /gists/:id/star (deleteStar)",  function(next) {
        client.gists.create(
            {
                description: "Another bowl of pasta",
                public: "false",
                files: {
                    "ravioli.js": {
                        "content": "alert(\"want some ketchup with that?\");"
                    }
                }
            },
            function(err, res) {
                Assert.equal(err, null);
                var id = res.id;

                client.gists.star(
                    {
                        id: id
                    },
                    function(err, res) {
                        Assert.equal(err, null);

                        client.gists.deleteStar(
                            {
                                id: id
                            },
                            function(err, res) {
                                Assert.equal(err, null);

                                client.gists["delete"](
                                    {
                                        id: id
                                    },
                                    function(err, res) {
                                        Assert.equal(err, null);
                                        next();
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    });

    it("should successfully execute GET /gists/:id/star (checkStar)",  function(next) {
        client.gists.create(
            {
                description: "Another bowl of pasta",
                public: "false",
                files: {
                    "ravioli.js": {
                        "content": "alert(\"want some ketchup with that?\");"
                    }
                }
            },
            function(err, res) {
                Assert.equal(err, null);
                var id = res.id;

                client.gists.star(
                    {
                        id: id
                    },
                    function(err, res) {
                        Assert.equal(err, null);

                        client.gists["delete"](
                            {
                                id: id
                            },
                            function(err, res) {
                                Assert.equal(err, null);
                                next();
                            }
                        );
                    }
                );
            }
        );
    });

    it("should successfully execute POST /gists/:id/fork (fork)",  function(next) {
        client.gists.fork(
            {
                id: "3047099"
            },
            function(err, res) {
                Assert.equal(err, null);
                var id = res.id;

                Assert.equal(res.git_pull_url, "git://gist.github.com/" + id + ".git");
                Assert.equal(res.git_push_url, "git@gist.github.com:" + id + ".git");
                Assert.equal(res.description, "Why to call resume() after next()");
                Assert.equal(typeof res.files["resume_after_next.md"], "object");

                client.gists["delete"](
                    {
                        id: id
                    },
                    function(err, res) {
                        Assert.equal(err, null);
                        next();
                    }
                );
            }
        );
    });

    it("should successfully execute DELETE /gists/:id (delete)",  function(next) {
        client.gists.create(
            {
                description: "Another bowl of pasta",
                public: "false",
                files: {
                    "ravioli.js": {
                        "content": "alert(\"want some ketchup with that?\");"
                    }
                }
            },
            function(err, res) {
                Assert.equal(err, null);
                var id = res.id;

                client.gists["delete"](
                    {
                        id: id
                    },
                    function(err, res) {
                        Assert.equal(err, null);
                        next();
                    }
                );
            }
        );
    });
});
