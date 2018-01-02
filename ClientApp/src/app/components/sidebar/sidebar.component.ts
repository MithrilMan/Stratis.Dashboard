import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'side-bar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // TypeScript public modifiers
  private $BODY;
  private $MENU_TOGGLE;
  private $SIDEBAR_MENU;
  private $SIDEBAR_FOOTER;
  private $LEFT_COL;
  private $RIGHT_COL;
  private $NAV_MENU;
  private $FOOTER;

  constructor() { }

  ngOnInit() {
    console.log('hello `sidebar` component');

    this.initSidebar();
  }



  // Sidebar
  private initSidebar() {
    this.$BODY = $("body")
    this.$MENU_TOGGLE = $("#menu_toggle")
    this.$SIDEBAR_MENU = $("#sidebar-menu")
    this.$SIDEBAR_FOOTER = $(".sidebar-footer")
    this.$LEFT_COL = $(".left_col")
    this.$RIGHT_COL = $(".right_col")
    this.$NAV_MENU = $(".nav_menu")
    this.$FOOTER = $("footer")

    var CURRENT_URL = window.location.href.split('#')[0].split('?')[0];

    // TODO: This is some kind of easy fix, maybe we can improve this
    var setContentHeight = function () {
      // reset height
      this.$RIGHT_COL.css('min-height', $(window).height());

      var bodyHeight = this.$BODY.outerHeight(),
        footerHeight = this.$BODY.hasClass('footer_fixed') ? -10 : this.$FOOTER.height(),
        leftColHeight = this.$LEFT_COL.eq(1).height() + this.$SIDEBAR_FOOTER.height(),
        contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

      // normalize content
      contentHeight -= this.$NAV_MENU.height() + footerHeight;

      this.$RIGHT_COL.css('min-height', contentHeight);
    };

    this.$SIDEBAR_MENU.find('a').on('click', function (ev) {
      console.log('clicked - sidebar_menu');
      var $li = this.$(this).parent();

      if (this.$li.is('.active')) {
        this.$li.removeClass('active active-sm');
        this.$('ul:first', this.$li).slideUp(function () {
          setContentHeight();
        });
      } else {
        // prevent closing menu if we are on child menu
        if (!this.$li.parent().is('.child_menu')) {
          this.$SIDEBAR_MENU.find('li').removeClass('active active-sm');
          this.$SIDEBAR_MENU.find('li ul').slideUp();
        } else {
          if (this.$BODY.is(".nav-sm")) {
            this.$SIDEBAR_MENU.find("li").removeClass("active active-sm");
            this.$SIDEBAR_MENU.find("li ul").slideUp();
          }
        }
        this.$li.addClass('active');

        $('ul:first', this.$li).slideDown(function () {
          setContentHeight();
        });
      }
    });

    // toggle small or large menu 
    this.$MENU_TOGGLE.on('click', function () {
      console.log('clicked - menu toggle');

      if (this.$BODY.hasClass('nav-md')) {
        this.$SIDEBAR_MENU.find('li.active ul').hide();
        this.$SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
      } else {
        this.$SIDEBAR_MENU.find('li.active-sm ul').show();
        this.$SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
      }

      this.$BODY.toggleClass('nav-md nav-sm');

      setContentHeight();

      this.$('.dataTable').each(function () { $(this).dataTable().fnDraw(); });
    });

    // check active menu
    this.$SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

    this.$SIDEBAR_MENU.find('a').filter(function () {
      return this.href == CURRENT_URL;
    }).parent('li').addClass('current-page').parents('ul').slideDown(function () {
      setContentHeight();
    }).parent().addClass('active');

    // recompute content when resizing
    $(window).smartresize(function () {
      setContentHeight();
    });

    setContentHeight();

    // fixed sidebar
    if ($.fn.mCustomScrollbar) {
      $('.menu_fixed').mCustomScrollbar({
        autoHideScrollbar: true,
        theme: 'minimal',
        mouseWheel: { preventDefault: true }
      });
    }
  };
  // /Sidebar



  anchorClicked(event: MouseEvent) {
    var target = event.srcElement.id;
    var $li = $('#' + target.replace("chevron", "li")).parent();

    if ($li.is('.active')) {
      $li.removeClass('active active-sm');
      $('ul:first', $li).slideUp(function () {
        //this.setContentHeight();
      });
    } else {
      // prevent closing menu if we are on child menu
      if (!$li.parent().is('.child_menu')) {
        $('#sidebar-menu').find('li').removeClass('active active-sm');
        $('#sidebar-menu').find('li ul').slideUp();
      }

      $li.addClass('active');

      $('ul:first', $li).slideDown(function () {
        //this.setContentHeight();
      });
    }
  }
}
