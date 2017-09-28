using Sitecore;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Exceptions;
using Sitecore.Globalization;
using Sitecore.Shell.Applications.ContentEditor;
using Sitecore.Shell.Applications.Dialogs.MediaBrowser;
using Sitecore.Shell.Applications.WebEdit.Commands;
using Sitecore.Shell.Framework.Commands;
using Sitecore.Web;
using Sitecore.Web.UI.Sheer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SitecoreCognitiveServices.Feature.ImageSearch.Commands
{
    [Serializable]
    public class ChooseImage : WebEditImageCommand
    {
        public override void Execute(CommandContext context)
        {
            Assert.ArgumentNotNull((object)context, "context");
            ExplodeParameters(context);
            string formValue = WebUtil.GetFormValue("scPlainValue");
            context.Parameters.Add("fieldValue", formValue);
            Context.ClientPage.Start((object)this, "Run", context.Parameters);
        }

        protected static void Run(ClientPipelineArgs args)
        {
            Assert.ArgumentNotNull((object)args, "args");

            Item itemNotNull = Client.GetItemNotNull(args.Parameters["itemid"], Language.Parse(args.Parameters["language"]));
            itemNotNull.Fields.ReadAll();
            Field field = itemNotNull.Fields[args.Parameters["fieldid"]];

            Assert.IsNotNull((object)field, "field");

            ImageField imageField = new ImageField(field, field.Value);
            string parameter = args.Parameters["controlid"];
            string xml = args.Parameters["fieldValue"];

            if (args.IsPostBack)
                HandleSubmit(args, imageField, xml, parameter);
            else
                ShowSearch(args, field, xml, itemNotNull);
        }

        public static void HandleSubmit(ClientPipelineArgs args, ImageField imageField, string xml, string parameter)
        {
            if (args.Result == "undefined")
                return;

            string value = GetValue(args, imageField, xml);
            if(string.IsNullOrEmpty(value))
                SheerResponse.Alert("Item not found.");

            SheerResponse.SetAttribute("scHtmlValue", "value", WebEditImageCommand.RenderImage(args, value));
            SheerResponse.SetAttribute("scPlainValue", "value", value);
            SheerResponse.Eval("scSetHtmlValue('" + parameter + "')");
        }

        public static string GetValue(ClientPipelineArgs args, ImageField imageField, string xml)
        {
            if (string.IsNullOrEmpty(args.Result))
                return string.Empty;

            MediaItem mediaItem = (MediaItem)Client.ContentDatabase.GetItem(args.Result);
            if (mediaItem == null)
                return string.Empty;

            imageField.SetAttribute("mediaid", mediaItem.ID.ToString());
            if (xml.Length == 0)
                return imageField.Value;
            
            XmlValue xmlValue = new XmlValue(xml, "image");
            string attribute1 = xmlValue.GetAttribute("height");
            if (!string.IsNullOrEmpty(attribute1))
                imageField.Height = attribute1;
            string attribute2 = xmlValue.GetAttribute("width");
            if (!string.IsNullOrEmpty(attribute2))
                imageField.Width = attribute2;
            
            return imageField.Value;
        }

        public static void ShowSearch(ClientPipelineArgs args, Field field, string xml, Item itemNotNull)
        {
            string str = StringUtil.GetString(new string[2]
            {
                field.Source,
                "/sitecore/media library"
            });
            if (xml.Length > 0)
                xml = new XmlValue(xml, "image").GetAttribute("mediaid");

            string path = xml;
            if (str.StartsWith("~", StringComparison.InvariantCulture))
            {
                if (string.IsNullOrEmpty(path))
                    path = StringUtil.Mid(str, 1);
                str = "/sitecore/media library";
            }

            Language language = itemNotNull.Language;
            MediaBrowserOptions mediaBrowserOptions = new MediaBrowserOptions();
            Item obj1 = Client.ContentDatabase.GetItem(str, language);
            if (obj1 == null)
                throw new ClientAlertException("The source of this Image field points to an item that does not exist.");
            mediaBrowserOptions.Root = obj1;
            mediaBrowserOptions.AllowEmpty = true;

            if (!string.IsNullOrEmpty(path))
            {
                Item obj2 = Client.ContentDatabase.GetItem(path, language);
                if (obj2 != null)
                    mediaBrowserOptions.SelectedItem = obj2;
            }

            SheerResponse.ShowModalDialog(GetUrl(language.CultureInfo.TwoLetterISOLanguageName, Client.ContentDatabase.Name), "1000px", "600px", string.Empty, true);
            //SheerResponse.ShowModalDialog(mediaBrowserOptions.ToUrlString().ToString(), "1200px", "700px", string.Empty, true);
            args.WaitForPostBack();
        }

        public static string GetUrl(string scLanguage, string scDatabase)
        {
            return $"/SitecoreCognitiveServices/CognitiveImageSearch/RTESearch?&lang={scLanguage}&db={scDatabase}";

            /*
             "/SitecoreCognitiveServices/CognitiveImageSearch/RTESearch?&lang=" + scLanguage + "&db=" + scDatabase,
              null, //argument
              1000,
              600,
              scInsertCognitiveSitecoreMedia,
              null,
              "Insert Cognitive Media",
              true, //modal
              Telerik.Web.UI.WindowBehaviors.Close, // behaviors
              false, //showStatusBar
              false //showTitleBar
              */
        }
    }
}
 