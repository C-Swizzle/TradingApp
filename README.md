#tradingApp

This project is a video game trading website. Users are invited to create an account and list games to trade with other users for site credits.  The seller sets a price to sell/trade the game and buyers can search for and choose to buy a games in the selling inventory using credits. Once the buyer receives the game, feedback is left to close the trade and transfer the credits which are held in escrow prior to completion of the transaction. 

The project is a full stack application utilizing a front end UI styled with Materialize. We utilize static html pages as well as dynamically populated pages with templating via handlebars. User sessions and authentication is managed with Passport, and passwords were encrypted with bcrypt.

A mysql database is used to house user accounts as well as inventory. The technologies used here are Sequelize, MySQL Workbench, Postman.

The server side process are handled through NodeJS and Express.

Known Issues:

The actual app is much more involved than what could be created within our less-than two week time frame given. Many features could not be implemented within this time frame. Only the essentials to transacting a trade have been included in the submission. 

More UI convinience need to be added like finding info about a game on other market places ie. gamestop, amazon, ebay, and possibly other trading sites. More comprehensive and specific search functions need to be added. A library like stripe or paypal need to be added for users to buy credits with real money and pay for shipping. A UPC scanning capability should be added. An integrated shipping system through paypal or USPS is needed. Ideally a social media log in and integration with facebook, twitter, and instagram need to be added. The feedback process that finalizes the trade is incomplete till a timing issue is resolved.



Credits: The game project student developers are Chris MacKenzie, Neda Wo, and Mike Taniguchi.



Copyright (c) 2019 Chris MacKenzie, Neda Wo, Mike Taniguchi


The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. THE DEVELOPERS SHALL RETAIN NO LIABILITY FOR ANY TRANSACTIONS THAT ARISE FROM USING THE SITE.
