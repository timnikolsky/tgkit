export enum BotCommandScopeType {
    /**
	 * Represents the default scope of bot commands.
	 * Default commands are used if no commands with a narrower scope are specified for the user.
	 */
    Default = 'default',
    /** Represents the scope of bot commands, covering all private chats. */
    AllPrivateChats = 'allPrivateChats',
    /** Represents the scope of bot commands, covering all group and supergroup chats. */
    AllGroupChats = 'allGroupChats',
    /** Represents the scope of bot commands, covering all group and supergroup chat administrators. */
    AllChatAdministrators = 'allChatAdministrators',
    /** Represents the scope of bot commands, covering a specific chat. */
    Chat = 'chat',
    /** Represents the scope of bot commands, covering all administrators of a specific group or supergroup chat. */
    ChatAdministrators = 'chatAdministrators',
    /** Represents the scope of bot commands, covering a specific member of a group or supergroup chat. */
    ChatMember = 'chatMember'
}

export enum MenuButtonType {
    /** Represents a menu button, which opens the bot's list of commands */
    Commands = 'commands',
    /** Represents a menu button, which launches a Web App */
    WebApp = 'webApp',
    /** Describes that no specific value for the menu button was set. */
    Default = 'default'
}

export enum PassportElementErrorSource {
    /**
	 * Represents an issue in one of the data fields that was provided by the user.
	 * The error is considered resolved when the field's value changes
	 */
    Data = 'data',
    /**
	 * Represents an issue with the front side of a document.
	 * The error is considered resolved when the file with the front side of the document changes.
	 */
    FrontSide = 'frontSide',
    /**
	 * Represents an issue with the reverse side of a document.
	 * The error is considered resolved when the file with reverse side of the document changes.
	 */
    ReverseSide = 'reverseSide',
    /**
	 * Represents an issue with the selfie with a document.
	 * The error is considered resolved when the file with the selfie changes.
	 */
    Selfie = 'selfie',
    /**
	 * Represents an issue with a document scan.
	 * The error is considered resolved when the file with the document scan changes.
	 */
    File = 'file',
    /**
	 * Represents an issue with a list of scans.
	 * The error is considered resolved when the list of files containing the scans changes.
	 */
    Files = 'files',
    /**
	 * Represents an issue with one of the files that constitute the translation of a document. 
	 * The error is considered resolved when the file changes.
	 */
    TranslationFile = 'translationFile',
    /**
	 * Represents an issue with the translated version of a document.
	 * The error is considered resolved when a file with the document translation change.
	 */
    TranslationFiles = 'translationFiles',
    /** Represents an issue in an unspecified place. The error is considered resolved when new data is added. */
    Unspecified = 'unspecified'
}

export enum PassportElementType {
    PersonalDetails = 'personalDetails',
    Passport = 'passport',
    DriverLicense = 'driverLicense',
    IdentityCard = 'identityCard',
    InternalPassport = 'internalPassport',
    Address = 'address',
    UtilityBill = 'utilityBill',
    BankStatement = 'bankStatement',
    RentalAgreement = 'rentalAgreement',
    PassportRegistration = 'passportRegistration',
    TemporaryRegistration = 'temporaryRegistration'
}

export enum ChatMemberStatus {
    /** Represents a chat member that owns the chat and has all administrator privileges. */
    Owner = 'owner',
    /** Represents a chat member that has some additional privileges. */
    Administrator = 'administrator',
    /** Represents a chat member that has no additional privileges or restrictions. */
    Member = 'member',
    /** Represents a chat member that is under certain restrictions in the chat. Supergroups only. */
    Restricted = 'restricted',
    /** Represents a chat member that isn't currently a member of the chat, but may join it themselves. */
    Left = 'left',
    /** Represents a chat member that was banned in the chat and can't return to the chat or view chat messages. */
    Banned = 'banned'
}

/** Type of action to broadcast. */
export enum ChatAction {
	Typing = 'typing',
	UploadPhoto = 'uploadPhoto',
	RecordVideo = 'recordVideo',
	UploadVideo = 'uploadVideo',
	RecordVoice = 'recordVoice',
	UploadVoice = 'uploadVoice',
	UploadDocument = 'uploadDocument',
	ChooseSticker = 'chooseSticker',
	FindLocation = 'findLocation',
	RecordVideoNote = 'recordVideoNote',
	UploadVideoNote = 'uploadVideoNote'
}

/** Represents one result of an inline query. */
export enum InlineQueryResultType {
	Article = 'article',
	Photo = 'photo',
	Gif = 'gif',
	Mpeg4Gif = 'mpeg4Gif',
	Video = 'video',
	Audio = 'audio',
	Voice = 'voice',
	Document = 'document',
	Location = 'location',
	Venue = 'venue',
	Contact = 'contact',
	Game = 'game',
	CachedPhoto = 'cachedPhoto',
	CachedGif = 'cachedGif',
	CachedMpeg4Gif = 'cachedMpeg4Gif',
	CachedSticker = 'cachedSticker',
	CachedDocument = 'cachedDocument',
	CachedVideo = 'cachedVideo',
	CachedVoice = 'cachedVoice',
	CachedAudio = 'cachedAudio'
}

/** Color of the topic icon in RGB format. Currently only six colors are supported. */
export enum ForumTopicIconColor {
	Blue = 0x6FB9F0,
	Yellow = 0xFFD67E,
	Purple = 0xCB86DB,
	Green = 0x8EEE98,
	Pink = 0xFF93B2,
	Red = 0xFB6F5F
}

export enum PollType {
	Regular = 'regular',
	Quiz = 'quiz'
}

export enum KeyboardButtonPollType {
	Regular = 'regular',
	Quiz = 'quiz'
}

export enum StickerFormat {
	Regular = 'static',
	Mask = 'animated',
	CustomEmoji = 'video'
}

export enum StickerType {
	Regular = 'regular',
	Mask = 'mask',
	CustomEmoji = 'customEmoji'
}

export enum ParseMode {
	Markdown = 'Markdown',
	MarkdownV2 = 'MarkdownV2',
	HTML = 'HTML'
}

export enum MessageOriginType {
	User = 'user',
	HiddenUser = 'hiddenUser',
	Chat = 'chat',
	Channel = 'channel'
}

export enum PaidMediaType {
	Preview = 'preview',
	Photo = 'photo',
	Video = 'video'
}

export enum ReactionType {
	Emoji = 'emoji',
	CustomEmoji = 'customEmoji'
}
